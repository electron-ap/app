import React, { useCallback, useEffect, useRef } from 'react'
import { message } from 'antd'
import '@antv/x6-react-shape'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'
import { DRAGGABLE_ALGO_COMPONENT, DRAGGABLE_MODEL } from 'libs/constants/graph'
import { useExperimentGraph } from '../rx-models/experiment-graph'
import { CanvasHandler } from '../common/canvas-handler'
import styles from './canvas-content.module.less'

interface Props {
  experimentId: string
  className?: string
  type?: string
  nodes?: any
}

export const CanvasContent: React.FC<Props> = (props) => {
  const { experimentId, className, type, nodes } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const expGraph = useExperimentGraph(experimentId)

  useEffect(() => {
    if (type !== 'add') expGraph.changeExperiment(experimentId, nodes, type)
  }, [expGraph, nodes, type, experimentId])

  // 渲染画布
  useEffect(() => {
    expGraph.renderGraph(containerRef.current!, canvasRef.current!)
  }, [expGraph])

  // 处理组件拖拽落下事件
  const [, dropRef] = useDrop({
    accept: [DRAGGABLE_ALGO_COMPONENT, DRAGGABLE_MODEL],
    drop: (item: any, monitor) => {
      const currentMouseOffset = monitor.getClientOffset()
      const sourceMouseOffset = monitor.getInitialClientOffset()
      const sourceElementOffset = monitor.getInitialSourceClientOffset()
      const diffX = sourceMouseOffset!.x - sourceElementOffset!.x
      const diffY = sourceMouseOffset!.y - sourceElementOffset!.y
      const x = currentMouseOffset!.x - diffX
      const y = currentMouseOffset!.y - diffY
      if (expGraph.isGraphReady()) {
        expGraph.requestAddNode({
          clientX: x,
          clientY: y,
          nodeMeta: item.component,
        })
      } else {
        message.info('实验数据建立中，请稍后再尝试添加节点')
      }
    },
  })

  // 画布侧边 toolbar handler
  const onHandleSideToolbar = useCallback(
    (action: 'in' | 'out' | 'fit' | 'real') => () => {
      // 确保画布已渲染
      if (expGraph.isGraphReady()) {
        switch (action) {
          case 'in':
            expGraph.zoomGraph(0.1)
            break
          case 'out':
            expGraph.zoomGraph(-0.1)
            break
          case 'fit':
            expGraph.zoomGraphToFit()
            break
          case 'real':
            expGraph.zoomGraphRealSize()
            break
          default:
        }
      }
    },
    [expGraph],
  )

  return (
    <div
      ref={(elem) => {
        containerRef.current = elem
        dropRef(elem)
      }}
      className={classNames(className, styles.canvasContent)}
    >
      {/* 缩放相关的 toolbar */}
      <CanvasHandler
        onZoomIn={onHandleSideToolbar('in')}
        onZoomOut={onHandleSideToolbar('out')}
        onFitContent={onHandleSideToolbar('fit')}
        onRealContent={onHandleSideToolbar('real')}
      />
      {/* 图容器 */}
      <div ref={canvasRef} />
    </div>
  )
}
