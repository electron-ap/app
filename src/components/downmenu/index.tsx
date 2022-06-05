import Popover from 'antd/es/popover'
import styles from '../../pages/tradeSchedule/components/core/views/common/canvas-handler/index.module.less'
import DownMenuJsx, { actionsType } from './inner'
import { EllipsisOutlined } from '@ant-design/icons'
import './index.less'

const DownMenuMain = ({
  record,
  actions,
  handlerImpl,
}: {
  record: object
  actions: Array<actionsType>
  handlerImpl: any
}) => {
  return (
    <div className={'acSvg'}>
      <Popover
        placement="leftTop"
        arrowPointAtCenter
        overlayClassName={styles.popover}
        content={() => (
          <DownMenuJsx
            handlerImpl={handlerImpl}
            record={record}
            actions={actions}
          />
        )}
        trigger="hover"
      >
        <EllipsisOutlined style={{ fontSize: 20, color: '#1890ff' }} />
      </Popover>
    </div>
  )
}

export default DownMenuMain
