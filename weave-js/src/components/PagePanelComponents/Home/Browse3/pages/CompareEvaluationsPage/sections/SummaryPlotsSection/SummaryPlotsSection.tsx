import {Box} from '@material-ui/core';
import {Popover} from '@mui/material';
import {Switch} from '@wandb/weave/components';
import {Button} from '@wandb/weave/components/Button';
import {
  DraggableGrow,
  DraggableHandle,
} from '@wandb/weave/components/DraggablePopups';
import {TextField} from '@wandb/weave/components/Form/TextField';
import {Tailwind} from '@wandb/weave/components/Tailwind';
import {maybePluralize} from '@wandb/weave/core/util/string';
import classNames from 'classnames';
import React, {useEffect, useMemo, useRef, useState} from 'react';

import {buildCompositeMetricsMap} from '../../compositeMetricsUtil';
import {
  BOX_RADIUS,
  PLOT_HEIGHT,
  PLOT_PADDING,
  STANDARD_BORDER,
  STANDARD_PADDING,
} from '../../ecpConstants';
import {getOrderedCallIds} from '../../ecpState';
import {EvaluationComparisonState} from '../../ecpState';
import {
  flattenedDimensionPath,
  resolveSummaryMetricValueForEvaluateCall,
} from '../../ecpUtil';
import {HorizontalBox, VerticalBox} from '../../Layout';
import {PlotlyBarPlot} from './PlotlyBarPlot';
import {PlotlyRadarPlot, RadarPlotData} from './PlotlyRadarPlot';

/**
 * Summary plots produce plots to summarize evaluation comparisons.
 */
export const SummaryPlots: React.FC<{
  state: EvaluationComparisonState;
  setSelectedMetrics: (newModel: Record<string, boolean>) => void;
}> = props => {
  const {radarData, allMetricNames} = useNormalizedPlotDataFromMetrics(
    props.state
  );
  const {selectedMetrics} = props.state;
  const setSelectedMetrics = props.setSelectedMetrics;

  useEffect(() => {
    // If selectedMetrics is null, we should show all metrics
    if (selectedMetrics == null) {
      setSelectedMetrics(
        Object.fromEntries(Array.from(allMetricNames).map(m => [m, true]))
      );
    }
  }, [selectedMetrics, setSelectedMetrics, allMetricNames]);

  // filter down the data to only include the selected metrics, after
  // computation, to allow quick addition/removal of metrics.
  const filteredData = useMemo(() => {
    const data: RadarPlotData = {};
    for (const [callId, metricBin] of Object.entries(radarData)) {
      const metrics: {[metric: string]: number} = {};
      for (const [metric, value] of Object.entries(metricBin.metrics)) {
        if (selectedMetrics?.[metric]) {
          metrics[metric] = value;
        }
      }
      if (Object.keys(metrics).length > 0) {
        data[callId] = {
          metrics,
          name: metricBin.name,
          color: metricBin.color,
        };
      }
    }
    return data;
  }, [radarData, selectedMetrics]);

  const plotElements = useMemo(() => {
    const plots = [
      <PlotlyRadarPlot key="radar" height={PLOT_HEIGHT} data={filteredData} />,
    ];

    // transform the data to be a list of metrics for each callId
    const metrics: {
      [metric: string]: {
        callIds: string[];
        values: number[];
        name: string;
        colors: string[];
      };
    } = {};
    for (const [callId, metricBin] of Object.entries(filteredData)) {
      for (const [metric, value] of Object.entries(metricBin.metrics)) {
        metrics[metric] = {
          callIds: [...(metrics[metric]?.callIds ?? []), callId],
          values: [...(metrics[metric]?.values ?? []), value],
          name: metric,
          colors: [...(metrics[metric]?.colors ?? []), metricBin.color],
        };
      }
    }

    for (const metric of Object.keys(metrics)) {
      const metricBin = metrics[metric];
      // add 10% buffer to display labels on top of bars
      const maxY = Math.max(...metricBin.values) * 1.1;
      const minY = Math.min(...metricBin.values, 0);
      const plotlyData: Plotly.Data = {
        type: 'bar',
        y: metricBin.values,
        x: metricBin.callIds,
        text: metricBin.values.map(value => value.toFixed(3)),
        textposition: 'outside',
        textfont: {
          size: 14,
          color: 'black',
        },
        name: metric,
        marker: {color: metricBin.colors},
      };
      plots.push(
        <PlotlyBarPlot
          key={metric}
          height={PLOT_HEIGHT}
          plotlyData={plotlyData}
          yRange={[minY, maxY]}
        />
      );
    }

    return plots;
  }, [filteredData]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial width calculation
    updateWidth();
    setIsInitialRender(false);

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const plotsPerPage = useMemo(() => {
    const includesRadar = plotElements.some(plot => plot.key === 'radar');
    // radar plot is twice as wide as the others
    return Math.max(1, Math.floor((containerWidth - (includesRadar ? PLOT_HEIGHT : 0)) / (PLOT_HEIGHT + 20))); // 20px for margin
  }, [containerWidth]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(plotElements.length / plotsPerPage);
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * plotsPerPage;
  const endIndex = Math.min(startIndex + plotsPerPage, plotElements.length);
  const currentPlots = plotElements.slice(startIndex, endIndex);

  // Render placeholder during initial render
  if (isInitialRender) {
    return <div ref={containerRef} style={{width: '100%', height: '400px'}} />;
  }
  
  return (
    <VerticalBox
      sx={{
        paddingLeft: STANDARD_PADDING,
        paddingRight: STANDARD_PADDING,
        flex: '1 1 auto',
        width: '100%',
      }}>
      <HorizontalBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Box
          sx={{
            fontSize: '1.5em',
            fontWeight: 'bold',
          }}>
          Summary Metrics
        </Box>
        <Box sx={{marginLeft: 'auto'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{marginRight: '4px'}}>Configure displayed metrics</div>
            <MetricsSelector
              selectedMetrics={selectedMetrics}
              setSelectedMetrics={setSelectedMetrics}
              allMetrics={Array.from(allMetricNames)}
            />
          </div>
        </Box>
      </HorizontalBox>
      <div ref={containerRef} style={{width: '100%'}}>
        <HorizontalBox
          sx={{display: 'flex'}}>
          {currentPlots.map((plot, index) => (
            <Box
              key={index}
              sx={{
                height: PLOT_HEIGHT,
                width: plot.key === 'radar' ? PLOT_HEIGHT*2 : PLOT_HEIGHT,
                borderRadius: BOX_RADIUS,
                border: STANDARD_BORDER,
                // Make room for title on top of the plot
                paddingTop: PLOT_PADDING - 10,
                paddingBottom: PLOT_PADDING,
                paddingLeft: PLOT_PADDING,
                paddingRight: PLOT_PADDING,
              }}>
              {plot}
            </Box>
          ))}
        </HorizontalBox>
      </div>
      <HorizontalBox sx={{width: '100%'}}>
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Tailwind>
            <div className="flex items-center">
              <Button
                variant="quiet"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                icon="chevron-next"
                className="rotate-180"
              />
              <span className="mx-2 pb-2 text-sm text-moon-500">
                {startIndex + 1}-{endIndex} of {plotElements.length}
              </span>
              <Button
                variant="quiet"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                icon="chevron-next"
              />
            </div>
          </Tailwind>
        </Box>
      </HorizontalBox>
    </VerticalBox>
  );
};

const MetricsSelector: React.FC<{
  setSelectedMetrics: (newModel: Record<string, boolean>) => void;
  selectedMetrics: Record<string, boolean> | undefined;
  allMetrics: string[];
}> = ({setSelectedMetrics, selectedMetrics, allMetrics}) => {
  const [search, setSearch] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : ref.current);
    setSearch('');
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const filteredCols = search
    ? allMetrics.filter(col => col.toLowerCase().includes(search.toLowerCase()))
    : allMetrics;

  const shownMetrics = Object.values(selectedMetrics ?? {}).filter(Boolean);

  const numHidden = allMetrics.length - shownMetrics.length;
  const buttonSuffix = search ? `(${filteredCols.length})` : 'all';

  return (
    <>
      <span ref={ref}>
        <Button
          variant="ghost"
          icon="column"
          tooltip="Manage metrics"
          onClick={onClick}
        />
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
            },
          },
        }}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={DraggableGrow}>
        <Tailwind>
          <div className="min-w-[360px] p-12">
            <DraggableHandle>
              <div className="flex items-center pb-8">
                <div className="flex-auto text-xl font-semibold">
                  Manage metrics
                </div>
                <div className="ml-16 text-moon-500">
                  {maybePluralize(numHidden, 'hidden column', 's')}
                </div>
              </div>
            </DraggableHandle>
            <div className="mb-8">
              <TextField
                placeholder="Filter columns"
                autoFocus
                value={search}
                onChange={setSearch}
              />
            </div>
            <div className="max-h-[300px] overflow-auto">
              {Array.from(allMetrics).map((metric: string) => {
                const value = metric;
                const idSwitch = `toggle-vis_${value}`;
                const checked = selectedMetrics?.[metric] ?? false;
                const label = metric;
                const disabled = false;
                if (
                  search &&
                  !label.toLowerCase().includes(search.toLowerCase())
                ) {
                  return null;
                }
                return (
                  <div key={value}>
                    <div
                      className={classNames(
                        'flex items-center py-2',
                        disabled ? 'opacity-40' : ''
                      )}>
                      <Switch.Root
                        id={idSwitch}
                        size="small"
                        checked={checked}
                        onCheckedChange={isOn => {
                          setSelectedMetrics(
                            isOn
                              ? {...selectedMetrics, [metric]: true}
                              : {...selectedMetrics, [metric]: false}
                          );
                        }}
                        disabled={disabled}>
                        <Switch.Thumb size="small" checked={checked} />
                      </Switch.Root>
                      <label
                        htmlFor={idSwitch}
                        className={classNames(
                          'ml-6',
                          disabled ? '' : 'cursor-pointer'
                        )}>
                        {label}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex items-center">
              <Button
                size="small"
                variant="quiet"
                icon="hide-hidden"
                disabled={filteredCols.length === 0}
                onClick={() => {
                  const newModel = {...selectedMetrics};
                  for (const metric of filteredCols) {
                    newModel[metric] = false;
                  }
                  setSelectedMetrics(newModel);
                }}>
                {`Hide ${buttonSuffix}`}
              </Button>
              <div className="flex-auto" />
              <Button
                size="small"
                variant="quiet"
                icon="show-visible"
                disabled={filteredCols.length === 0}
                onClick={() => {
                  const newModel = {...selectedMetrics};
                  for (const metric of filteredCols) {
                    newModel[metric] = true;
                  }
                  setSelectedMetrics(newModel);
                }}>
                {`Show ${buttonSuffix}`}
              </Button>
            </div>
          </div>
        </Tailwind>
      </Popover>
    </>
  );
};

const normalizeValues = (values: Array<number | undefined>): number[] => {
  // find the max value
  // find the power of 2 that is greater than the max value
  // divide all values by that power of 2
  const maxVal = Math.max(...(values.filter(v => v !== undefined) as number[]));
  const maxPower = Math.ceil(Math.log2(maxVal));
  return values.map(val => (val ? val / 2 ** maxPower : 0));
};

const useNormalizedPlotDataFromMetrics = (
  state: EvaluationComparisonState
): {radarData: RadarPlotData; allMetricNames: Set<string>} => {
  const compositeMetrics = useMemo(() => {
    return buildCompositeMetricsMap(state.data, 'summary');
  }, [state]);
  const callIds = useMemo(() => {
    return getOrderedCallIds(state);
  }, [state]);

  return useMemo(() => {
    const normalizedMetrics = Object.values(compositeMetrics)
      .map(scoreGroup => Object.values(scoreGroup.metrics))
      .flat()
      .map(metric => {
        const values = callIds.map(callId => {
          const metricDimension = Object.values(metric.scorerRefs).find(
            scorerRefData => scorerRefData.evalCallIds.includes(callId)
          )?.metric;
          if (!metricDimension) {
            return undefined;
          }
          const val = resolveSummaryMetricValueForEvaluateCall(
            metricDimension,
            state.data.evaluationCalls[callId]
          );
          if (typeof val === 'boolean') {
            return val ? 1 : 0;
          } else {
            return val;
          }
        });
        const normalizedValues = normalizeValues(values);
        const evalScores: {[evalCallId: string]: number | undefined} =
          Object.fromEntries(
            callIds.map((key, i) => [key, normalizedValues[i]])
          );

        const metricLabel = flattenedDimensionPath(
          Object.values(metric.scorerRefs)[0].metric
        );
        return {
          metricLabel,
          evalScores,
        };
      });
    const radarData = Object.fromEntries(
      callIds.map(callId => {
        const evalCall = state.data.evaluationCalls[callId];
        return [
          evalCall.callId,
          {
            name: evalCall.name,
            color: evalCall.color,
            metrics: Object.fromEntries(
              normalizedMetrics.map(metric => {
                return [
                  metric.metricLabel,
                  metric.evalScores[evalCall.callId] ?? 0,
                ];
              })
            ),
          },
        ];
      })
    );
    const allMetricNames = new Set(normalizedMetrics.map(m => m.metricLabel));
    return {radarData, allMetricNames};
  }, [callIds, compositeMetrics, state.data.evaluationCalls]);
};
