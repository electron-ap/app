import { BehaviorSubject } from 'rxjs'
import OperateCore from './operate-core'

class OperateModel extends OperateCore {
  experimentId: string
  constructor(expId: string) {
    super()
    this.experimentId = expId
  }

  checkoutImpl<T, C>(code: T) {
    this.callback[code].apply(this, arguments)
  }

  renderNode<T, C>(container: HTMLDivElement, operate: Array<T>, callback: C) {
    super.render({
      container,
      operate,
      callback,
    })
  }
}

const gOperateMap = new Map<string, OperateModel>()

export const useOperateModel = (experimentId: number | string) => {
  const expId = experimentId.toString()
  let existOperateModel = gOperateMap.get(expId)
  if (!existOperateModel) {
    existOperateModel = new OperateModel(expId)
    gOperateMap.set(expId, existOperateModel)
  }
  return existOperateModel
}
