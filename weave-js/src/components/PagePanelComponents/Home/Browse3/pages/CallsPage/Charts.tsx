import {quantileSorted} from 'simple-statistics';
import React, {useEffect, useMemo, useRef} from 'react';
import * as Plotly from 'plotly.js';
import moment from 'moment';
import _ from 'lodash';
import {
  BLUE_500,
  GREEN_500,
  MOON_200,
  MOON_500,
  TEAL_400,
} from '../../../../../../common/css/color.styles';

type ChartData = {
  started_at: string;
  latency: number;
  isError: boolean;
};
export const LatencyPlotlyChart: React.FC<{
  height: number;
  chartData: ChartData[];
  binSizeMinutes?: number;
}> = ({height, chartData, binSizeMinutes = 60}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const plotlyData: Plotly.Data[] = useMemo(() => {
    const groupedData = _(chartData)
      .groupBy(d =>
        moment(d.started_at)
          .startOf('minute')
          .minute(
            Math.floor(moment(d.started_at).minute() / binSizeMinutes) *
              binSizeMinutes
          )
          .format()
      )
      .map((group, date) => {
        const latencies = _.sortBy(group.map(d => d.latency));
        const p50 = quantileSorted(latencies, 0.5);
        const p95 = quantileSorted(latencies, 0.95);
        const p99 = quantileSorted(latencies, 0.99);
        return {timestamp: date, p50, p95, p99};
      })
      .value();

    return [
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: groupedData.map(d => d.timestamp),
        y: groupedData.map(d => d.p50),
        name: 'p50 Latency',
        line: {color: BLUE_500},
        marker: {color: BLUE_500},
        hovertemplate: '%{data.name}: %{y:.2f} ms<extra></extra>',
      },
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: groupedData.map(d => d.timestamp),
        y: groupedData.map(d => d.p95),
        name: 'p95 Latency',
        line: {color: GREEN_500},
        marker: {color: GREEN_500},
        hovertemplate: '%{data.name}: %{y:.2f} ms<extra></extra>',
      },
      {
        type: 'scatter',
        mode: 'lines+markers',
        x: groupedData.map(d => d.timestamp),
        y: groupedData.map(d => d.p99),
        name: 'p99 Latency',
        line: {color: MOON_500},
        marker: {color: MOON_500},
        hovertemplate: '%{data.name}: %{y:.2f} ms<extra></extra>',
      },
    ];
  }, [chartData, binSizeMinutes]);

  useEffect(() => {
    // Configure the layout for the Plotly chart with crosshairs (spikelines)
    const plotlyLayout: Partial<Plotly.Layout> = {
      height: height - 40,
      title: {
        text: 'Latency',
        y: 0.98, // Move title up slightly
        font: {
          size: 16, // Adjust title font size if needed
        },
      },
      margin: {
        l: 50,
        r: 30,
        b: 50,
        t: 100, // Increase top margin to make room for title and legend
        pad: 4,
      },
      xaxis: {
        title: 'Time',
        type: 'date',
        // tickformat: '%Y-%m-%d %H:%M:%S',
        automargin: true,
        showgrid: false,
        gridcolor: '#e0e0e0',
        linecolor: '#e0e0e0',
        showspikes: true, // Enable spikelines on the x-axis
        spikemode: 'across', // Show spikes across all subplots
        spikethickness: 1,

        spikecolor: '#999999',
      },
      yaxis: {
        // title: 'Latency (ms)',
        automargin: true,
        griddash: 'dot', // This makes the grid lines dotted

        showgrid: true,
        gridcolor: '#e0e0e0',
        linecolor: '#e0e0e0',
        showspikes: false, // Enable spikelines on the y-axis
      },
      hovermode: 'x unified', // Show hover information for all points sharing the same x-axis value
      dragmode: false, // Disable zooming and panning
      hoverlabel: {
        // bgcolor: '#333', // Background color of the tooltip
        // font: {
        //   color: '#fff', // Font color of the tooltip text
        //   size: 12, // Font size of the tooltip text
        // },
        bordercolor: MOON_200, // Border color of the tooltip
      },
      legend: {
        orientation: 'h', // horizontal orientation
        yanchor: 'top',
        y: 1.05, // Position legend below the title
        xanchor: 'center',
        x: 0.5,
        font: {
          size: 12, // Adjust legend font size if needed
        },
      },
    };
    const plotlyConfig: Partial<Plotly.Config> = {
      displayModeBar: false, // Hide the mode bar
    };

    Plotly.newPlot(
      divRef.current as any,
      plotlyData,
      plotlyLayout,
      plotlyConfig
    );
  }, [plotlyData, height]);

  return <div ref={divRef}></div>;
};

export const ErrorPlotlyChart: React.FC<{
  height: number;
  chartData: ChartData[];
  binSizeMinutes?: number;
}> = ({height, chartData, binSizeMinutes = 15}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const plotlyData: Plotly.Data[] = useMemo(() => {
    const errorData = chartData.filter(d => d.isError);
    console.log('HERE', chartData, errorData);
    const startTimestamp = moment
      .min(errorData.map(d => moment(d.started_at)))
      .valueOf();
    const endTimestamp = moment
      .max(errorData.map(d => moment(d.started_at)))
      .valueOf();
    // Filter for error data only

    return [
      {
        type: 'histogram',
        x: errorData.map(d => d.started_at), // Use the timestamps for the x-axis
        name: 'Error Count',
        marker: {color: TEAL_400},

        histfunc: 'count', // Automatically count the occurrences in each bin
        hovertemplate: '%{y} errors<extra></extra>',
        // hoverinfo: 'none',

        // autobinx: true, // Enable automatic binning

        // xbins: {
        //   start: startTimestamp,
        //   end: endTimestamp,
        //   size: binSizeMinutes * 60 * 1000, // Convert minutes to milliseconds
        // },
      },
    ];
  }, [chartData, binSizeMinutes]);

  // Find the first non-zero bin
  const firstNonZeroBin = useMemo(() => {
    const errorData = chartData.filter(d => d.isError);
    if (errorData.length === 0) {
      return null;
    }
    // Sort the error data by timestamp
    const sortedErrorData = _.sortBy(errorData, d =>
      moment(d.started_at).valueOf()
    );
    return moment(sortedErrorData[0].started_at).valueOf(); // First non-zero timestamp
  }, [chartData]);
  console.log(moment(firstNonZeroBin));
  useEffect(() => {
    // Configure the layout for the Plotly chart
    const plotlyLayout: Partial<Plotly.Layout> = {
      height: height - 40,
      title: 'Errors',
      margin: {
        l: 50,
        r: 30,
        b: 50,
        t: 50,
        pad: 0,
      },
      xaxis: {
        title: 'Time',
        type: 'date',
        automargin: true,
        showgrid: false,
        gridcolor: '#e0e0e0',
        linecolor: '#e0e0e0',
        range: firstNonZeroBin ? [firstNonZeroBin, null] : undefined, // Start at the first non-zero timestamp
      },
      yaxis: {
        // title: 'Error Count',
        automargin: true,
        showgrid: true,
        gridcolor: '#e0e0e0',
        griddash: 'dot', // This makes the grid lines dotted

        linecolor: '#e0e0e0',
      },
      hovermode: 'x unified',
      hoverlabel: {
        bgcolor: 'white',
        bordercolor: MOON_200,
        font: {family: 'Arial, sans-serif'},
      },

      dragmode: 'zoom', // Disable zooming and panning
    };

    const plotlyConfig: Partial<Plotly.Config> = {
      displayModeBar: false, // Hide the mode bar
    };

    Plotly.newPlot(
      divRef.current as any,
      plotlyData,
      plotlyLayout,
      plotlyConfig
    );
  }, [plotlyData, height]);

  return <div ref={divRef}></div>;
};

export const RequestsPlotlyChart: React.FC<{
  height: number;
  chartData: ChartData[];
}> = ({height, chartData}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const plotlyData: Plotly.Data[] = useMemo(
    () => [
      {
        type: 'histogram',
        x: chartData.map(d => d.started_at),
        name: 'Requests',
        marker: {color: TEAL_400},
        hovertemplate: 'Requests: %{y}<extra></extra>',
      },
    ],
    [chartData]
  );

  useEffect(() => {
    const plotlyLayout: Partial<Plotly.Layout> = {
      height: height - 40,
      title: 'Requests',
      margin: {l: 50, r: 30, b: 50, t: 50, pad: 0},
      xaxis: {
        title: 'Time',
        type: 'date',
        automargin: true,
        showgrid: false,
        linecolor: '#e0e0e0',
        showspikes: true,
        spikemode: 'across',
        spikethickness: 1,
        spikecolor: '#999999',
      },
      yaxis: {
        // title: 'Request Count',
        automargin: true,
        showgrid: true,
        gridcolor: '#e0e0e0',
        linecolor: '#e0e0e0',
        griddash: 'dot',
        showspikes: false,
      },
      bargap: 0, // Remove gap between bars
      hovermode: 'x unified',
      hoverlabel: {
        bgcolor: 'white',
        bordercolor: MOON_200,
        font: {family: 'Arial, sans-serif'},
      },
    };

    const plotlyConfig: Partial<Plotly.Config> = {
      displayModeBar: false,
    };

    Plotly.newPlot(
      divRef.current as any,
      plotlyData,
      plotlyLayout,
      plotlyConfig
    );
  }, [plotlyData, height]);

  return <div ref={divRef}></div>;
};
