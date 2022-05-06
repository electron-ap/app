import xhrFactory from 'libs/http/config'

// 下载模版
export const tradePathExport = xhrFactory.get(
  `/TradePath/ExportModelTradePath`,
  {
    headers: {
      'Content-Type': 'blob',
    },
  },
)

// 添加贸易链条
export const AddTradePath = xhrFactory.post(`/TradePath/AddTradePath`)

// 编辑贸易链条
export const UpdateTradePath = xhrFactory.put(`/TradePath/UpdateTradePath`)

// 删除贸易链条
export const DeleteTradePath = xhrFactory.delete(`/TradePath/DeleteTradePath`)

// 发布贸易链条
export const PublishTradePath = xhrFactory.post(`/TradePath/PublishTradePath`)

// 共享贸易链条
export const ShareTradePath = xhrFactory.post(`/TradePath/ShareTradePath`)

// 获取链条明细
export const GetDetail = xhrFactory.get(`/TradePath/GetDetail`)

// 导入模版
export const tradePathImport = xhrFactory.post(`/TradePath/ImportTradePath`)

//
export const AddTradeScheduling = xhrFactory.post(
  `/TradeScheduling/AddTradeScheduling`,
)

export const SearchTradeScheduling = xhrFactory.get(
  `/TradeScheduling/SearchTradeScheduling`,
  {
    Current: 1,
    PageSize: 10,
  },
)

export const GetTradeScheduling = xhrFactory.get(
  `/TradeScheduling/GetTradeScheduling`,
  {
    Current: 1,
    PageSize: 10,
  },
)

export const companyQuery = xhrFactory.get(`/Company/Get`)

// 删除排期
export const deleteSchedule = (id: number) =>
  xhrFactory.delete(`/TradeScheduling/UpdateTradeScheduling?ids=${id}`)

export const tradeSchedulingRelaPlan = xhrFactory.post(
  `/TradeScheduling/TradeSchedulingRelaPlan`,
)
