import { GetDetail } from 'libs/api/trade-schedule'
import DagDemo from 'pages/tradeSchedule/components/core/views'
import { useEffect, useState, useMemo } from 'react'

const ContainerJsx = ({ id, type }: { id: string; type: string }) => {
  const [data, setData] = useState()
  useEffect(() => {
    async function init() {
      const result = await GetDetail({ receive: +id })
      setData(result.data)
    }
    if (type !== 'add') {
      init()
    }
  }, [type, id])

  const isShowMenu = useMemo(() => type !== 'normal', [type])

  return (
    <DagDemo
      nodes={data}
      experimentId={id}
      type={type}
      isShowMenu={isShowMenu}
    />
  )
}

export default ContainerJsx
