import { Checkbox } from 'antd'
import { useState } from 'react'
import ItemJsx from './itemJsx'
import { SchedulerChainModal } from '../modal'

const ChainMainJsx = ({ chains }: { chains: Array<any> }) => {
  const [checkedChain, setChain] = SchedulerChainModal.useContainer()
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  const onChange = (list: any) => {
    setChain(list)
    setIndeterminate(!!list.length && list.length < chains.length)
    setCheckAll(list.length === chains.length)
  }

  const onCheckAllChange = (e: any) => {
    setChain(e.target.checked ? chains.map((item) => item.chainId) : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
      </div>
      <Checkbox.Group
        style={{ width: '100%' }}
        value={checkedChain}
        onChange={onChange}
      >
        {chains.map((item, ind) => (
          <ItemJsx key={ind} chain={item} />
        ))}
      </Checkbox.Group>
    </>
  )
}

export default ChainMainJsx
