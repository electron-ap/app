import xhrFactory from "libs/http/config";

// 查询
export const tradePlanQuery = xhrFactory.get(`/TradePlan/SeachPlan`, {
  current: 1,
  pageSize: 10,
});

// 删除
export const tradePlanDelete = xhrFactory.delete(`/TradePlan/BatchDel`);

// 获取公司
export const fetchCompany = xhrFactory.get("/GlobalList/companyList");

// 发票版型
export const invoiceTypes = xhrFactory.get("/GlobalList/InvoiceTypes");

// 公司产品
export const companyProduct = xhrFactory.get("/GlobalList/CompanyProduct");

// 添加计划
export const addPlan = xhrFactory.post("/TradePlan/crud");

// 修改计划
export const editorPlan = xhrFactory.put("/TradePlan/crud");

// 获取计划详情
export const getDetailPlan = xhrFactory.get("/TradePlan/GetDetialPlan");

// 获取下载模版
export const fetchModel = xhrFactory.get("/TradePlan/ExportModel", {
  headers: {
    "Content-Type": "blob",
  },
});

// 上传计划
export const importPlan = xhrFactory.post("/TradePlan/Import", {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 退回
export const tradePlanReturn = xhrFactory.post("/TradePlan/return");
