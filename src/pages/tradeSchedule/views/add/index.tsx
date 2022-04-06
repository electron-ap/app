import Top from 'pages/tradeSchedule/components/top'
import DagDemo from 'pages/tradeSchedule/components/core/views'
import OperateJsx from 'pages/tradeSchedule/components/top/operate'
import './add.scss'
import { useSearchParams } from 'react-router-dom'
import { ChainModal } from './model'
import AddTitle from './title'
import { useEffect } from 'react'

const TradeScheduleAdd = () => {
  let [searchParams] = useSearchParams()
  const id = searchParams.get('id') || ''
  const type = searchParams.get('type') || ''
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 150,
      behavior: 'smooth',
    })
  }, [])
  return (
    <>
      <Top
        title={<AddTitle />}
        operationJsx={<OperateJsx id={id} type={type} />}
      />
      <DagDemo experimentId={id} type={type} />
    </>
  )
}

export default () => {
  return (
    <ChainModal.Provider>
      <TradeScheduleAdd />
    </ChainModal.Provider>
  )
}
