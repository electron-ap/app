import { RollbackOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import './top.scss'

const Top = ({
  operationJsx,
  title,
}: {
  operationJsx: ReactNode
  title: string | ReactNode
}) => {
  const navigate = useNavigate()
  return (
    <div className={'top'}>
      <div className={'title'}>
        <RollbackOutlined onClick={() => navigate(-1)} />
        <span className={'t-content'}>{title}</span>
      </div>
      <div className={'operate'}>{operationJsx}</div>
    </div>
  )
}

export default Top
