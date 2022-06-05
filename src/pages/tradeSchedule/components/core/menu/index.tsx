import { Collapse } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import './left.scss'
import DragJsx from './menu'
import { iconForm } from './config'
import styles from '../views/common/canvas-handler/index.module.less'
import Popover from 'antd/es/popover'

const { Panel } = Collapse

const ModelJsx = ({
  modelData,
}: {
  modelData: Array<{ icon: any; name?: string }>
}) => {
  return (
    <Popover
      overlayClassName={styles.popover}
      placement="top"
      content={'按住鼠标左键可将元素拖动到画布中'}
      trigger="hover"
    >
      <div className={'moduleContainer'}>
        {modelData.map(({ icon, ...rest }, ind: number) => (
          <DragJsx node={rest} key={ind} icon={icon} />
        ))}
      </div>
    </Popover>
  )
}

const genExtra = () => (
  <FormOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation()
    }}
  />
)

const MenuJsx: React.FC = () => {
  return (
    <div>
      <div className={'left'}>
        <Collapse ghost defaultActiveKey={['1']} expandIconPosition={'left'}>
          <Panel header="基础排期" key="1">
            <ModelJsx modelData={iconForm} />
          </Panel>
          <Panel header="模板" key="2" extra={genExtra()}>
            <ModelJsx modelData={iconForm} />
          </Panel>
          <Panel header="待排链条" key="3" extra={genExtra()}>
            <ModelJsx modelData={iconForm} />
          </Panel>
        </Collapse>
        <br />
      </div>
    </div>
  )
}

export default MenuJsx
