import Top from 'pages/tradeSchedule/components/top'
import DetailSearch from './search'
import styles from './index.module.less'
import OperateJsx from './operate'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { GetTradeScheduling } from 'libs/api/trade-schedule'
import ChainMainJsx from './main'
import { useListQuery } from 'libs/hooks'
import { SchedulerChainModal } from './modal'
import { Spin } from 'antd'

const Title = ({ title, date }: { title: string; date: string }) => {
  return (
    <span className={styles.title}>
      <span className={styles.titleH1}>{title}</span>
      <span className={styles.titleDate}>{date}</span>
      <span className={styles.titleButton}>已关联计划列表</span>
    </span>
  )
}

const ChainJsx = () => {
  const { id } = useParams()
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: 'chain',
      api: GetTradeScheduling,
    },
    { id },
  )

  const dateTime = useMemo(() => {
    const { startTime = '', endTime = '' } = data
    return `${startTime} - ${endTime}`
  }, [data])

  return (
    <Spin spinning={isLoading}>
      <Top
        title={<Title title={data.name || ''} date={dateTime} />}
        operationJsx={<DetailSearch />}
      />
      <OperateJsx name={data.name || ''} />
      <ChainMainJsx chains={data.chains || []} />
    </Spin>
  )
}

const ChainContainJsx = () => (
  <SchedulerChainModal.Provider>
    <ChainJsx />
  </SchedulerChainModal.Provider>
)
export default ChainContainJsx
