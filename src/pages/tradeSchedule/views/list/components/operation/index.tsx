import { useParamsContext } from 'libs/context/paramsProvider'
import { operate } from './operate'
import OperationJsx from 'components/operate'

const TradeScheduleOperation = () => {
  const { setParams } = useParamsContext()
  const actionsImpl: operateType.intActionImpl<Schedular.actionType> = {
    all: function () {
      setParams({ state: undefined })
    },
    noStart: function () {
      setParams({ state: 0 })
    },
    process: function () {
      setParams({ state: 1 })
    },
    danger: function () {
      setParams({ state: 2 })
    },
    error: function () {
      setParams({ state: 3 })
    },
    success: function () {
      setParams({ state: 4 })
    },
  }

  return (
    <OperationJsx<Schedular.actionType>
      operate={operate}
      actionsImpl={actionsImpl}
    />
  )
}

export default TradeScheduleOperation
