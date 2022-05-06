import React from 'react'
import classNames from 'classnames'
import styles from './node-element.module.less'
import { NodeFormDemo } from './basic/node-config'
import { NExperimentGraph } from '../../rx-models/typing'

interface Props {
  contractInfo: NExperimentGraph.ConstactType
  experimentId: string
  initialValues: object
  nodeId: string
}

export const NodeElement: React.FC<Props> = (props) => {
  const { experimentId, initialValues, nodeId, contractInfo } = props

  return (
    <div className={classNames(styles.nodeElement)}>
      <NodeFormDemo
        contractInfo={contractInfo}
        nodeId={nodeId}
        experimentId={experimentId}
        initialValues={initialValues}
      />
    </div>
  )
}
