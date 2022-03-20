import { Button } from 'antd'
import { operate } from './config'
import { useExperimentGraph } from '../core/views/rx-models/experiment-graph'

const OperateJsx = () => {
  const expGraph = useExperimentGraph('1')

  const actionImpl: GraphOperate.optImplType = {
    undo: function () {},
    save: function () {
      // const data = expGraph.experimentGraph$.getValue();
      localStorage.setItem(
        'key',
        JSON.stringify(expGraph.experimentGraph$.getValue()),
      )
    },
    share: function () {},
    upload: function () {},
  }

  const setCommand = (event: any) => {
    const button = event.target.closest('button')
    const code: GraphOperate.optType = button.dataset.code
    actionImpl[code]()
  }
  return (
    <>
      {operate.map((item, ind) => (
        <Button
          onClick={setCommand}
          key={ind}
          style={{ marginLeft: 15 }}
          data-code={item.code}
        >
          {item.name}
        </Button>
      ))}
    </>
  )
}
export default OperateJsx
