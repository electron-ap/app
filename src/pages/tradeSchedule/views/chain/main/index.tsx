import { Checkbox, Divider } from 'antd'
import { useState } from 'react'
import ItemJsx from './itemJsx'

const CheckboxGroup = Checkbox.Group

const ChainMainJsx = ({ chains }: { chains: Array<any> }) => {
  const [checkedChain, setChain] = useState<Array<any>>([])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)

  const onChange = (list: any) => {
    setChain(list)
    setIndeterminate(!!list.length && list.length < chains.length)
    setCheckAll(list.length === chains.length)
  }

  const onCheckAllChange = (e: any) => {
    setChain(e.target.checked ? chains : [])
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
