import xhrFactory from "libs/http/config";

// 获取设置选项
export const getSettingList = xhrFactory.get("/Global/Setings");

// 获取设置选项
export const setSettingItem = xhrFactory.post("/Global/Setings");
