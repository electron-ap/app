import { Spin } from 'antd'
import { SearchTradeScheduling } from 'libs/api/trade-schedule'
import { useParamsContext } from 'libs/context/paramsProvider'
import { useListQuery } from 'libs/hooks'
import Main from './components/main'
import TradeScheduleOperation from './components/operation'
import TradeScheduleSearch from './components/search'
import style from './index.module.less'

const TradeScheduleJsx = () => {
  const { params } = useParamsContext()
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: 'scheduling',
      api: SearchTradeScheduling,
    },
    params,
  )
  return (
    <Spin spinning={isLoading}>
      <div className={style.container}>
        <div className={style.top}>
          <TradeScheduleSearch />
          <TradeScheduleOperation />
        </div>
        <div className={style.main}>
          <Main data={data} />
        </div>
      </div>
    </Spin>
  )
}

export default TradeScheduleJsx
