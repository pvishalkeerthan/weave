import React, {useMemo, useState} from 'react';
import {useCallsForQueryCharts} from './callsTableQuery';

import {GridFilterModel, GridSortModel} from '@mui/x-data-grid-pro';

import {WFHighLevelCallFilter} from './callsTableFilter';
import {DEFAULT_FILTER_CALLS} from './CallsTable';
import {getCostFromCostData} from '../CallPage/cost';
import GradientAreaChart from './Charts';
import {Tailwind} from '../../../../../Tailwind';

type CallsChartsProps = {
  startTime?: number;
  endTime?: number;
  entity: string;
  project: string;
  filterModelProp: GridFilterModel;
  filter: WFHighLevelCallFilter;
  //   setFilterModel?: (newModel: GridFilterModel) => void;
};

export const CallsCharts = ({
  startTime,
  endTime,
  entity,
  project,
  filter,
  filterModelProp,
}: // filterModel,
// filter,
CallsChartsProps) => {
  //   <FilterPanel
  //   filterModel={filterModel}
  //   columnInfo={filterFriendlyColumnInfo}
  //   setFilterModel={setFilterModel}
  //   selectedCalls={selectedCalls}
  //   clearSelectedCalls={clearSelectedCalls}
  // />
  const [filterModel, setFilterModel] = useState<GridFilterModel>(
    filterModelProp ?? DEFAULT_FILTER_CALLS
  );
  const columns = useMemo(() => ['summary.weave.costs', 'started_at'], []);
  const columnSet = useMemo(() => new Set(columns), [columns]);
  const sortCalls: GridSortModel = useMemo(
    () => [{field: 'started_at', sort: 'asc'}],
    []
  );
  const calls = useCallsForQueryCharts(
    entity,
    project,
    filter,
    filterModelProp,
    0,
    10, // change back to 1000 later
    columns, // need to select columns for performance. not working??
    columnSet,
    sortCalls
  );
  const callsLoading = calls.loading;
  const [callsResult, setCallsResult] = useState(calls.result);
  const [callsTotal, setCallsTotal] = useState(calls.total);

  //   const costAndTimeData = useMemo(() => {
  //     return calls.result
  //       .filter(
  //         call =>
  //           call.traceCall?.started_at !== undefined &&
  //           getCostFromCostData(call.traceCall?.summary?.weave?.costs ?? {})
  //             .costNumeric !== undefined
  //       )
  //       .map(call => ({
  //         value: getCostFromCostData(call.traceCall?.summary?.weave?.costs ?? {})
  //           .costNumeric,
  //         timestamp: call.traceCall?.started_at ?? '',
  //       }));
  //   }, [calls.result]);

  const costAndTimeData = useMemo(() => {
    return calls.result.map(call => ({
      started_at: call.traceCall?.started_at ?? '',
      //   ended_at: call.traceCall?.ended_at ?? '',
      latency: call.traceCall?.summary?.weave?.latency_ms ?? 0,
      //   timestamp: call.traceCall?.started_at ?? '',
    }));
  }, [calls.result]);
  console.log(calls.result);
  // Sum up the cost data

  console.log(
    'Cost data:',
    filter,
    filterModelProp,
    filterModel,
    calls,
    costAndTimeData,
    calls
  );

  // const costSums = costconsData !== undefined ? sumCostDataForCostTable(costData) : [];
  // console.log(costData2, callsResult);
  return (
    <Tailwind>
      <div className="ml-10 mr-10 rounded-lg border border-moon-250 p-[30px]">
        <div>Latency</div>
        <GradientAreaChart chartData={costAndTimeData} />
      </div>
    </Tailwind>
  );
};
