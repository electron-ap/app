import { Checkbox } from 'antd'
import { operate } from './operateConfig'
import styles from './item.module.less'
import OperationJsx from 'components/operate'
import {
  DeleteTradePath,
  PublishTradePath,
  ShareTradePath,
} from 'libs/api/trade-schedule'
import { modelHandler } from 'libs/utils/model'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ContainerJsx from './container'

const ItemJsx = ({ chain }: { chain: any }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const actionsImpl: operateType.intActionImpl<chainType.actionType> = {
    share: async function () {
      const { chainId } = chain
      await ShareTradePath({ chainIds: [chainId] })
    },
    publish: async function () {
      const { chainId } = chain
      await PublishTradePath({ ids: [chainId] })
    },
    editor: function () {
      const { chainId, name, productName } = chain
      navigate(
        `/TradeSchedule/add?id=${chainId}&type=editor&name=${name}&producetName=${productName}`,
      )
    },
    delete: function () {
      modelHandler({
        async onOk() {
          await DeleteTradePath({
            ids: [chain.chainId],
          })
          await queryClient.invalidateQueries('chain')
        },
      })
    },
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        <div>
          <Checkbox value={chain.chainId}>{chain.name}</Checkbox>
          <span style={{ padding: '0 15px' }}>
            产品名称：{chain.productName}
          </span>
          <span>状态：{chain.state}</span>
        </div>
        <div>
          <OperationJsx<chainType.actionType>
            operate={operate}
            actionsImpl={actionsImpl}
          />
        </div>
      </div>
      <div className={styles.chainMain}>
        <ContainerJsx type={'normal'} id={chain.chainId} />
      </div>
    </div>
  )
}

export default ItemJsx
