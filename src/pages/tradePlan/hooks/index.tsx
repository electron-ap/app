import { modelHandler } from 'libs/utils/model'
import { tradePlanDelete, tradePlanReturn } from 'libs/api/trade-plan'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

function useTradePlanOperate(queryKey: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const cancelHandler = (data: { [v: string]: unknown }) => {
    modelHandler({
      title: '退回',
      text: '您确定要退回当前数据么',
      onOk: async (e: any) => {
        e()
        await tradePlanReturn({ id: data.id, remake: data.remake })
        queryClient.invalidateQueries(queryKey)
      },
    })
  }

  const editHandler = async (data: { [v: string]: unknown }) => {
    navigate(`/TradePlan/editor?id=${data.id}`)
  }

  const deleteHandler = (data: { [v: string]: unknown }) => {
    modelHandler({
      onOk: async (e: any) => {
        e()
        await tradePlanDelete({ ids: [data.id] })
        queryClient.invalidateQueries(queryKey)
      },
    })
  }

  return {
    cancelHandler,
    editHandler,
    deleteHandler,
  }
}

export default useTradePlanOperate
