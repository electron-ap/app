import { Button } from 'antd'
import { operate } from './config'
import { useExperimentGraph } from '../core/views/rx-models/experiment-graph'
import { AddTradePath, UpdateTradePath } from 'libs/api/trade-schedule'
import OperateJsx from 'components/operate'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { ChainModal } from 'pages/tradeSchedule/views/add/model'
import html2canvas from 'html2canvas'

export type optType = 'undo' | 'save' | 'share' | 'upload'
interface appendType {
  id?: number
  scheduingId?: number
}
const TopOperateJsx = ({ id, type }: { id: string; type: string }) => {
  const expGraph = useExperimentGraph(id, type)
  const { chainParams } = ChainModal.useContainer()

  const actionImpl: operateType.intActionImpl<optType> = {
    undo: function () {},
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
      console.log(
        document
          .querySelector('.x6-graph .x6-graph-svg-viewport')!
          .getBoundingClientRect(),
      )
      try {
        const canvas: HTMLCanvasElement = await html2canvas(
          document.querySelector(
            '.x6-graph .x6-graph-svg-viewport',
          ) as HTMLElement,
        )
        let imgBase64 = canvas.toDataURL('image/jpeg', 0.5)
        const result = await api({
          snapshot: imgBase64,
          name: chainParams.name,
          producetName: chainParams.producetName,
          type: 0,
          data,
          ...appendParams,
        })
      } catch (err) {
        console.log(err)
      }
    },
    share: function () {},
    upload: function () {},
  }

  return <OperateJsx<optType> operate={operate} actionsImpl={actionImpl} />
}
export default TopOperateJsx
