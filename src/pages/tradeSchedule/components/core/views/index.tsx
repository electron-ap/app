import React from 'react'
import classNames from 'classnames'
import { Layout } from 'antd'
// import { RouteComponentProps } from 'react-router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DAGCanvas } from './dag-canvas'

import styles from './index.module.less'
import MenuJsx from 'pages/tradeSchedule/components/core/menu'

interface Props {
  experimentId: string
}

const { Content } = Layout

const DagDemo: React.FC<Props> = (props) => {
  const { experimentId = '1' } = props

  return (
    <Layout>
      <Content className={styles.content}>
        <div className={classNames(styles.experiment)}>
          <DndProvider backend={HTML5Backend}>
            <MenuJsx />
            <div className={styles.editPanel}>
              <DAGCanvas
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
