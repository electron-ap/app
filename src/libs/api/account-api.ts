import xhrFactory from "libs/http/config";

// 用户列表
export const getUserList = xhrFactory.get("/User/crud");
