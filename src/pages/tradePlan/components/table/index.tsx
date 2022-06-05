import { Spin } from 'antd'
import { tradePlanQuery } from 'libs/api/trade-plan'
import { useParamsContext } from 'libs/context/paramsProvider'
import { useListQuery } from 'libs/hooks'
import { useState } from 'react'
import { columns } from '../../config/table'
import TableJsx from '../../../../components/table'

const TradePlanTable = () => {
  const [selectKey, setSelectKey] = useState()
  const { params, setSelectsRow } = useParamsContext()
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: 'trade',
      api: tradePlanQuery,
    },
    params,
  )

  const onSelectChange = (key: any, selectedRows: Array<object>) => {
    setSelectKey(key)
    setSelectsRow(selectedRows)
  }

  const rowSelection = {
    selectedRowKeys: selectKey,
    onChange: onSelectChange,
  }

  return (
    <Spin spinning={isLoading}>
      <TableJsx
        rowSelection={rowSelection}
        data={data}
        size={'small'}
        rowKey={'id'}
        columns={columns}
      />
    </Spin>
  )
}

export default TradePlanTable
