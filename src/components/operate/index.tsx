import { Button, message } from 'antd'
import { ButtonType } from 'antd/lib/button'

interface Props<T extends string> {
  operate: Array<operateType.optAction<T>>
  actionsImpl: operateType.intActionImpl<T>
}

function OperationJsx<T extends string>(props: Props<T>) {
  const { operate, actionsImpl } = props
  const checkoutImpl = (code: T) => {
    makeCommand(code, actionsImpl)
  }

  // 创建命令
  function makeCommand(state: T, receiver = actionsImpl) {
    receiver[state].apply(null, arguments)
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
