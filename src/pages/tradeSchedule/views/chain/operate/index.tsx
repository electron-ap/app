import { Button, message } from 'antd'
import { useParamsContext } from 'libs/context/paramsProvider'
import { operate } from './config'
import { useQueryClient } from 'react-query'
import { isEmpty } from 'lodash'
import { submitType } from 'libs/types/formField'
import { useNavigate, useParams } from 'react-router-dom'
import OperationJsx from 'components/operate'

const DetailOperation = ({ name }: { name: string }) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
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
    batchDelete: function () {},
  }

  return (
    <OperationJsx<SchedularDetail.actionType>
      operate={operate}
      actionsImpl={actionsImpl}
    />
  )
}

export default DetailOperation
