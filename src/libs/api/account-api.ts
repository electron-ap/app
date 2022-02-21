import xhrFactory from "libs/http/config";

// 用户列表
export const getUserList = xhrFactory.get("/User/crud");

// 添加
export const addUserList = xhrFactory.post("/User/crud");
