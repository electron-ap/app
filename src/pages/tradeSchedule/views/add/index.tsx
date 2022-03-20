import Top from 'pages/tradeSchedule/components/top'
import DagDemo from 'pages/tradeSchedule/components/core/views'
import OperateJsx from 'pages/tradeSchedule/components/top/operate'
import './add.scss'

const TradeScheduleAdd = () => {
  return (
    <>
      <Top title={'贸易链1'} operationJsx={<OperateJsx />} />
      <DagDemo experimentId={'1'} />
    </>
  )
}

export default TradeScheduleAdd
