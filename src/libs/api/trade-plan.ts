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
