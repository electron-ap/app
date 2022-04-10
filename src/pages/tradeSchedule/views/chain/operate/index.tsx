import { message } from 'antd'
import { operate } from './config'
import { useQueryClient } from 'react-query'
import { isEmpty } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import OperationJsx from 'components/operate'
import { SchedulerChainModal } from '../modal'
import { DeleteTradePath } from 'libs/api/trade-schedule'
import { modelHandler } from 'libs/utils/model'

const DetailOperation = ({ name }: { name: string }) => {
  const [checkedChain] = SchedulerChainModal.useContainer()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const isComputed = (code: string) => {
    if (isEmpty(checkedChain) && code !== 'add') {
      message.info('请选择一个或多个贸易链条')
      return true
    }
  }

  const actionsImpl: operateType.intActionImpl<SchedularDetail.actionType> = {
    add: function () {
      navigate(`/TradeSchedule/add?id=${id}`)
    },
    share: function () {},
    publish: function () {},
    preview: function () {},
    upload: function () {},
    import: function () {},
    download: function () {},
    batchDelete: function () {
      modelHandler({
        async onOk() {
          await DeleteTradePath({ ids: checkedChain })
          await queryClient.invalidateQueries('chain')
        },
      })
    },
  }

  return (
    <OperationJsx<SchedularDetail.actionType>
      operate={operate}
      actionsImpl={actionsImpl}
      isComputed={isComputed}
    />
  )
}

export default DetailOperation
