import React from 'react'
import classNames from 'classnames'
import styles from './node-element.module.less'
import { NodeFormDemo } from './basic/node-config'

interface Props {
  experimentId: string
  initialValues: object
  nodeId: string
}

export const NodeElement: React.FC<Props> = (props) => {
  const { experimentId, initialValues, nodeId } = props

  return (
    <div className={classNames(styles.nodeElement)}>
      <NodeFormDemo
        nodeId={nodeId}
        experimentId={experimentId}
        initialValues={initialValues}
      />
    </div>
  )
}
