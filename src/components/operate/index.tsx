import { Button } from 'antd'
import { isFunction } from 'lodash'

interface Props<T extends string> {
  operate: Array<operateType.optAction<T>>
  actionsImpl: operateType.intActionImpl<T>
  isComputed?: Function
}

function OperationJsx<T extends string>(props: Props<T>) {
  const { operate, actionsImpl, isComputed } = props
  const checkoutImpl = (code: T) => {
    makeCommand(code, actionsImpl)
  }

  // 创建命令
  function makeCommand(state: T, receiver = actionsImpl) {
    if (isFunction(isComputed) && isComputed(state)) {
      return
    }
    receiver[state]()
  }

  return (
    <div>
      {operate.map(({ code, name, ...props }) => (
        <Button onClick={() => checkoutImpl(code)} {...props} key={code}>
          {name}
        </Button>
      ))}
    </div>
  )
}

export default OperationJsx
