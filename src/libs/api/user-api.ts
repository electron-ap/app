import xhrFactory from "libs/http/config";

// 登陆
export const login = xhrFactory.post(`/Home/Login`);

// 获取用户信息
export const getUserInfo = xhrFactory.get("/Home/GetUserInfo", {
  header: "123123",
});

// 退出登录
export const logout = xhrFactory.get("/Home/LoginOut");
//
export const resetPassword = xhrFactory.post("/engineer/reset-password");
