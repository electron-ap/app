import { Button } from 'antd'
import ReactDOM from 'react-dom'

// type FnParams = Parameters<Fn>
interface Options<T, C> {
  operate: Array<T>
  container?: HTMLDivElement | undefined
  callback: C
}
class OperateCore {
  private container: HTMLDivElement | undefined
  private operate: Array<any> | undefined
  protected callback: any

  // 子类复写改函数
  checkoutImpl<T, C>(code: T) {}

  render<T, C>(params: Options<T, C>) {
    this.setMeta<T, C>(params)
    ReactDOM.render(
      (
        <>
          {this.operate!.map(({ code, name, ...props }) => (
            <Button
              onClick={(e) => this.checkoutImpl(code)}
              {...props}
              key={code}
            >
              {name}
            </Button>
          ))}
        </>
      ) as any,
      this.container as any,
    )
  }

  setMeta<T, C>(
    params: Pick<Options<T, C>, 'container' | 'operate' | 'callback'>,
  ) {
    const { container, operate, callback } = params
    if (container) {
      this.setContainer(container)
    }
    if (operate) {
      this.setOperate<T>(operate)
    }
    if (callback) {
      this.setCallBack<C>(callback)
    }
  }

  setContainer(container: HTMLDivElement) {
    this.container = container
  }

  setOperate<T>(operate: Array<T>) {
    this.operate = operate
  }

  setCallBack<C>(callback: C) {
    this.callback = callback
  }
}
export default OperateCore
