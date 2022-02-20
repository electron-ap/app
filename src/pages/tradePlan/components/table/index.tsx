import { Spin } from "antd";
import { tradePlanQuery } from "libs/api/trade-plan";
import { useParamsContext } from "libs/context/paramsProvider";
import { useListQuery } from "libs/hooks";
import PlanTableJsx from "./tradePlanTable";

const TradePlanTable = () => {
  const { params } = useParamsContext();
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: "trade",
      api: tradePlanQuery,
    },
    params
  );
  return (
    <Spin spinning={isLoading}>
      <PlanTableJsx
        params={params}
        queryKey={"trade"}
        rowKey={"id"}
        data={data}
      />
    </Spin>
  );
};

export default TradePlanTable;
