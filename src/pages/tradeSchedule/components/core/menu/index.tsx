import { Collapse } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import './left.scss'
import DragJsx from './menu'
import { iconForm } from './config'
const { Panel } = Collapse

const ModelJsx = ({
  modelData,
}: {
  modelData: Array<{ icon: any; name?: string }>
}) => {
  return (
    <div className={'moduleContainer'}>
      {modelData.map(({ icon, ...rest }, ind: number) => (
        <DragJsx node={rest} key={ind} icon={icon} />
      ))}
    </div>
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
