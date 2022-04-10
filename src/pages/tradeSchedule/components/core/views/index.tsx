import React, { useRef } from 'react'
import classNames from 'classnames'
import { Layout } from 'antd'
import { DndProvider, createDndContext } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DAGCanvas } from './dag-canvas'

import styles from './index.module.less'
import MenuJsx from 'pages/tradeSchedule/components/core/menu'
const RNDContext = createDndContext(HTML5Backend)

interface Props {
  experimentId: string
  isShowMenu?: boolean
  type: string
  nodes?: any
}

const { Content } = Layout

const DagDemo: React.FC<Props> = (props) => {
  const manager = useRef(RNDContext)
  const { experimentId, isShowMenu = true, type, nodes } = props
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={classNames(styles.experiment)}>
          <DndProvider manager={manager.current.dragDropManager!}>
            {isShowMenu && <MenuJsx />}
            <div className={styles.editPanel}>
              <DAGCanvas
                nodes={nodes}
                type={type}
                experimentId={experimentId}
                className={styles.dagCanvas}
              />
            </div>
          </DndProvider>
        </div>
      </Content>
    </Layout>
  )
}

export default DagDemo
