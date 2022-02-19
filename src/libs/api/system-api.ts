import xhrFactory from "libs/http/config";

// 获取设置选项
export const getSettingList = xhrFactory({
  url: `/Global/Setings`,
  method: "GET",
});

// 获取设置选项
export const setSettingItem = xhrFactory({
  url: `/Global/Setings`,
  method: "POST",
});
