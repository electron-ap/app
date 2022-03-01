import xhrFactory from "libs/http/config";

// 下载模版
export const tradePathExport = xhrFactory.get(
  `/TradePath/ExportModelTradePath`,
  {
    headers: {
      "Content-Type": "blob",
    },
  }
);

// 导入模版
export const tradePathImport = xhrFactory.post(`/TradePath/ImportTradePath`);
