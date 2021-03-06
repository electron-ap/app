import { CloseCircleOutlined, PlusSquareOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import DynamicForm from 'components/form'
import dialogJsx from 'libs/utils/dialogJsx'
import { memo } from 'react'
import styles from './index.module.less'
import { submitType, TransformType } from 'libs/types/formField'
import { addConfig } from './add'
import { ButtonType } from 'antd/lib/button'
import { AddTradeScheduling, deleteSchedule } from 'libs/api/trade-schedule'
import dayjs from 'dayjs'
import { useQueryClient } from 'react-query'
import { operate } from '../operation/operate'
import { useNavigate } from 'react-router-dom'
import { modelHandler } from 'libs/utils/model'

export interface PropsType {
  data: {
    current: number
    list: Array<any>
    pageSize: number
    total: number
  }
}
const Main: React.FC<PropsType> = (props) => {
  const { list = [] } = props.data
  return (
    <div className={styles.main}>
      <Add />
      {list.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
}

interface Props {
  startTime: string
  endTime: string
  name: string
  errorMessage?: string
  planSpeed: string
  state: number
  id: number
}

const Item: React.FC<Props> = ({
  startTime,
  endTime,
  id,
  name,
  errorMessage,
  planSpeed,
  state,
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const deleteHandler = () => {
    modelHandler({
      async onOk() {
        await deleteSchedule(id)()
        queryClient.invalidateQueries('scheduling')
      },
    })
  }

  return (
    <div className={classNames(styles[operate[state + 1].code], styles.normal)}>
      {state !== 1 && (
        <CloseCircleOutlined
          onClick={deleteHandler}
          className={styles.deleteIcon}
        />
      )}
      <span className={styles.iconOpetate}>{operate[state + 1].name}</span>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/TradeSchedule/detailList/${id}`)}
      >
        <p>
          {startTime}???{endTime}
        </p>
        <p>?????????{name}</p>
        {errorMessage && <p>?????????{errorMessage}</p>}
        <p>???????????????{planSpeed ? planSpeed + '%' : planSpeed}</p>
      </div>
    </div>
  )
}

const transformSubmitDataConfig: Array<TransformType> = [
  {
    from: 'dateRange',
    to: 'startTime',
    format: (value: Array<Date>) => dayjs(value[0]).format('YYYY-MM-DD'),
  },
  {
    from: 'dateRange',
    to: 'endTime',
    isDelete: true,
    format: (value: Array<Date>) => dayjs(value[1]).format('YYYY-MM-DD'),
  },
]

const AddTradePlan = ({
  callback,
  destroyDialog,
}: {
  callback: () => void
  destroyDialog: () => void
}) => {
  const otherAction = [
    {
      name: '??????',
      key: 'cacel',
      callback: destroyDialog,
      style: {
        width: 80,
        marginLeft: 150,
      },
    },
    {
      name: '??????',
      key: 'import',
      type: 'primary' as ButtonType,
      isNeedValidate: true,
      callback: callback.bind(null, destroyDialog),
      style: {
        width: 80,
        marginLeft: 12,
      },
    },
  ]

  return (
    <DynamicForm
      transformSubmitDataConfig={transformSubmitDataConfig}
      onSubmit={callback.bind(null, destroyDialog)}
      {...addConfig}
      otherAction={otherAction}
    />
  )
}

const Add = memo(() => {
  const queryClient = useQueryClient()
  const addTradePlan = () => {
    dialogJsx(AddTradePlan, {
      dialogConfig: {
        title: '??????????????????',
        width: 400,
      },
      restsProps: {
        callback: async (destroyDialog: () => void, ...args: submitType) => {
          const [reset, value] = args
          try {
            await AddTradeScheduling(value)
            reset()
            queryClient.invalidateQueries('scheduling')
            destroyDialog()
          } catch (error) {
            reset()
          }
        },
      },
    })
  }

  return (
    <div
      onClick={addTradePlan}
      className={classNames(styles.add, styles.normal)}
    >
      <PlusSquareOutlined className={styles.icon} />
      <p>??????????????????</p>
    </div>
  )
})

export default Main
