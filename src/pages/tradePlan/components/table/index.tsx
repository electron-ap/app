import { Spin } from "antd";
import { tradePlanQuery } from "libs/api/trade-plan";
import { useParamsContext } from "libs/context/paramsProvider";
import { useListQuery } from "libs/hooks";
import PlanTableJsx from "./tradePlanTable";
import { useState } from "react";

const TradePlanTable = () => {
  const [selectKey, setSelectKey] = useState();
  const { params, selectsRow, setSelectsRow } = useParamsContext();
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: "trade",
      api: tradePlanQuery,
    },
    params
  );

  const onSelectChange = (key: any, selectedRows: Array<object>) => {
    setSelectKey(key);
    setSelectsRow(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys: selectKey,
    onChange: onSelectChange,
  };

  return (
    <Spin spinning={isLoading}>
      <PlanTableJsx
        rowSelection={rowSelection}
        params={params}
        queryKey={"trade"}
        rowKey={"id"}
        data={data}
      />
    </Spin>
  );
};

export default TradePlanTable;
