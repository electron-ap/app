import xhrFactory from "libs/http/config";
import qs from "qs";
// 用户列表
export const getUserList = xhrFactory.get("/User/crud");

// 添加
export const addUserList = xhrFactory.post("/User/crud");

// 删除
export const delUser = (params: any) => {
  let computedUrl = qs.stringify(params);
  return xhrFactory.delete(`/User/crud?${computedUrl}`)();
};

// 修改
export const editUser = xhrFactory.put("/User/crud");
