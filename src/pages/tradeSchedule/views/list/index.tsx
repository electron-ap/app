import { SearchTradeScheduling } from 'libs/api/trade-schedule'
import { useParamsContext } from 'libs/context/paramsProvider'
import { useListQuery } from 'libs/hooks'
import Main from './components/main'
import TradeScheduleOperation from './components/operation'
import TradeScheduleSearch from './components/search'
import style from './index.module.less'

const TradeScheduleJsx = () => {
  const { params, setSelectsRow } = useParamsContext()
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: 'scheduling',
      api: SearchTradeScheduling,
    },
    params,
  )
  return (
    <div className={style.container}>
      <div className={style.top}>
        <TradeScheduleSearch />
        <TradeScheduleOperation />
      </div>
      <div className={style.main}>
        <Main data={data} />
      </div>
    </div>
  )
}

export default TradeScheduleJsx
