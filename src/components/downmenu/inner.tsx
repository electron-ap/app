import Button from 'antd/lib/button'
import { BaseButtonProps } from 'antd/lib/button/button'
import { Space } from 'antd'

export declare interface actionsType extends BaseButtonProps {
  code: string
  name: string
  style?: object
}

const DownMenuJsx = ({
  record,
  actions,
  handlerImpl,
}: {
  record: object
  handlerImpl: any
  actions: Array<actionsType>
}) => {
  const handler = (code: string) => {
    // @ts-ignore
    const fn = handlerImpl[code + 'Handler']
    fn(record)
  }

  return (
    <div className={'downMenu'}>
      <Space direction={'vertical'}>
        {actions.map(({ code, name, ...restProps }) => (
          <Button {...restProps} key={code} onClick={handler.bind(null, code)}>
            {name}
          </Button>
        ))}
      </Space>
    </div>
  )
}

export default DownMenuJsx
