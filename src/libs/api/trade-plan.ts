import xhrFactory from "libs/http/config";

// 查询
export const tradePlanQuery = xhrFactory.get(`/TradePlan/SeachPlan`, {
  current: 1,
  pageSize: 10,
});
