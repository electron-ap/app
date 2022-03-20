import { RollbackOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import './top.scss'

const Top = ({
  operationJsx,
  title,
}: {
  operationJsx: ReactNode
  title: string
}) => {
  return (
    <div className={'top'}>
      <div className={'title'}>
        <RollbackOutlined />
        <span className={'t-content'}>{title}</span>
      </div>
      <div className={'operate'}>{operationJsx}</div>
    </div>
  )
}

export default Top
