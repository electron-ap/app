import Top from 'pages/tradeSchedule/components/top'
import OperateJsx from 'pages/tradeSchedule/components/top/operate'
import './add.scss'
import { useSearchParams } from 'react-router-dom'
import { ChainModal } from './model'
import AddTitle from './title'
import { useEffect } from 'react'
import ContainerJsx from '../chain/main/container'

const TradeScheduleAdd = () => {
  let [searchParams] = useSearchParams()

  const id = searchParams.get('id') || ''
  const type = searchParams.get('type') || 'add'
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
      <ContainerJsx type={type} id={id} />
    </>
  )
}

const TradeScheduleAddJsx = () => (
  <ChainModal.Provider>
    <TradeScheduleAdd />
  </ChainModal.Provider>
)

export default TradeScheduleAddJsx
