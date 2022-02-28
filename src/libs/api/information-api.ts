import xhrFactory from "libs/http/config";

// 产品列表
export const getProductList = xhrFactory.get("/CompanyProduct/Product");

// 公司
export const getCompanyList = xhrFactory.get("/Company/Crud");

// 获取挂关联公司列表
export const getLinkCompanyList = xhrFactory.get("/Company/CompanyRelationGet");

// 关联公司
export const LinkCompanyList = xhrFactory.post("/Company/CompanyRelation");
