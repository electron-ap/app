import React, { useEffect } from 'react'
import classNames from 'classnames'
import {
  useExperimentGraph,
  useUnmountExperimentGraph,
} from '../rx-models/experiment-graph'
import { CanvasContent } from './canvas-content'

import styles from './index.module.less'

interface Props {
  experimentId: string
  className?: string
  type: string
}

export const DAGCanvas: React.FC<Props> = (props) => {
  const { experimentId, className, type } = props
  const expGraph = useExperimentGraph(experimentId, type)

  // 处理画布卸载
  useUnmountExperimentGraph(experimentId)

  // 自定义组件的渲染控制
  useEffect(() => {
    ;(window as any).renderForm = expGraph.setActiveAlgoData
    return () => {
      delete (window as any).renderForm
    }
  }, [expGraph])

  return (
    <div className={classNames(styles.dagContainer, className)}>
      <CanvasContent
        experimentId={experimentId}
        className={styles.canvasContent}
      />
    </div>
  )
}
