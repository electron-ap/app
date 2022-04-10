import React from 'react'
import classNames from 'classnames'
import { useUnmountExperimentGraph } from '../rx-models/experiment-graph'
import { CanvasContent } from './canvas-content'

import styles from './index.module.less'

interface Props {
  experimentId: string
  className?: string
  type: string
  nodes?: any
}

export const DAGCanvas: React.FC<Props> = (props) => {
  const { experimentId, className, type, nodes } = props
  // 处理画布卸载
  useUnmountExperimentGraph(experimentId)

  return (
    <div className={classNames(styles.dagContainer, className)}>
      <CanvasContent
        experimentId={experimentId}
        className={styles.canvasContent}
        type={type}
        nodes={nodes}
      />
    </div>
  )
}
