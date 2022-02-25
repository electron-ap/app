import xhrFactory from "libs/http/config";

// 产品列表
export const getProductList = xhrFactory.get("/CompanyProduct/Product");

// 公司
export const getCompanyList = xhrFactory.get("/Company/Crud");
