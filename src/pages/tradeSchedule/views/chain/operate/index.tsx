import { message, Modal } from 'antd'
import { operate } from './config'
import { useQueryClient } from 'react-query'
import { isEmpty } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import OperationJsx from 'components/operate'
import { SchedulerChainModal } from '../modal'
import {
  DeleteTradePath,
  PublishTradePath,
  ShareTradePath,
  tradeSchedulingRelaPlan,
} from 'libs/api/trade-schedule'
import { modelHandler } from 'libs/utils/model'
// import { useModel } from 'libs/hooks/useModel'
import { useState } from 'react'
import TradePlanTable from 'pages/tradePlan/components/table'
import { useParamsContext } from 'libs/context/paramsProvider'

const DetailOperation = ({ name }: { name: string }) => {
  const [isVisible, setVisible] = useState(false)
  const { selectsRow } = useParamsContext()
  const [checkedChain] = SchedulerChainModal.useContainer()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const isComputed = (code: string) => {
    if (isEmpty(checkedChain) && !['add', 'join'].includes(code)) {
      message.info('请选择一个或多个贸易链条')
      return true
    }
  }

  const actionsImpl: operateType.intActionImpl<SchedularDetail.actionType> = {
    add: function () {
      navigate(`/TradeSchedule/add?id=${id}`)
    },
    share: async function () {
      await ShareTradePath({ chainIds: checkedChain })
    },
    publish: async function () {
      await PublishTradePath({ ids: checkedChain })
    },
    export: function () {},
    import: function () {},
    join: function () {
      setVisible(true)
    },
    batchDelete: function () {
      modelHandler({
        async onOk() {
          await DeleteTradePath({ ids: checkedChain })
          await queryClient.invalidateQueries('chain')
        },
      })
    },
  }

  const submitHandler = async () => {
    try {
      await tradeSchedulingRelaPlan({
        schedulingId: Number(id),
        planIds: selectsRow.map((item) => item.id),
      })
      setVisible(false)
      await queryClient.invalidateQueries('chain')
    } catch (err) {}
  }

  return (
    <>
      <Modal
        width={1000}
        onOk={submitHandler}
        destroyOnClose={true}
        title={'关联计划列表'}
        onCancel={() => setVisible(false)}
        visible={isVisible}
      >
        <TradePlanTable />
      </Modal>
      <OperationJsx<SchedularDetail.actionType>
        operate={operate}
        actionsImpl={actionsImpl}
        isComputed={isComputed}
      />
    </>
  )
}

export default DetailOperation
