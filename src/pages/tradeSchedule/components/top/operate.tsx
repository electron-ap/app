import { operate } from './config'
import { useExperimentGraph } from '../core/views/rx-models/experiment-graph'
import { AddTradePath, UpdateTradePath } from 'libs/api/trade-schedule'
import OperateJsx from 'components/operate'
import { useNavigate } from 'react-router-dom'
import { ChainModal } from 'pages/tradeSchedule/views/add/model'
// import { useMemo } from 'react'

export type optType = 'undo' | 'save'
interface appendType {
  id?: number
  scheduingId?: number
}
const TopOperateJsx = ({ id, type }: { id: string; type: string }) => {
  const expGraph = useExperimentGraph(id)
  const { chainParams } = ChainModal.useContainer()
  const navigate = useNavigate()

  // const operateItems = useMemo(() => {
  //   if (type === 'editor') {
  //     return operate
  //   }
  //   return operate.filter((item) => item.code !== 'share')
  // }, [type])

  const actionImpl: operateType.intActionImpl<optType> = {
    undo: function () {
      // expGraph.undoDeleteNode()
    },
    save: async function () {
      let api = AddTradePath
      let appendParams: appendType = {
        scheduingId: +id,
      }
      if (type === 'editor') {
        api = UpdateTradePath
        appendParams = {
          id: +id,
        }
      }
      const data = expGraph.experimentGraph$.getValue()
      try {
        await api({
          snapshot: '',
          name: chainParams.name,
          producetName: chainParams.producetName,
          type: 0,
          data,
          ...appendParams,
        })
        navigate(-1)
      } catch (err) {
        console.log(err)
      }
    },
    // share: function () {},
    // upload: function () {},
  }

  return <OperateJsx<optType> operate={operate} actionsImpl={actionImpl} />
}
export default TopOperateJsx
