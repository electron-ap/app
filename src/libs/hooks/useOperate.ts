import { useOperateModel } from 'libs/operate'
import { RefObject, useEffect } from 'react'

export function useOperate<T, C>(
  operateId: string,
  container: RefObject<HTMLDivElement>,
  operate: Array<T>,
  callback: C,
) {
  const operateModel = useOperateModel(operateId)
  useEffect(() => {
    operateModel.renderNode<T, C>(container.current!, operate, callback)
  }, [])
}
