import xhrFactory from "libs/http/config";

// 登陆
export const login = xhrFactory.post(`/Home/Login`);
// 退出登录
export const logout = xhrFactory.get("/engineer/logout");
//
export const resetPassword = xhrFactory.post("/engineer/reset-password");
