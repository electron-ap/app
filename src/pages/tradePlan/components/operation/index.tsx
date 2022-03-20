import { Button, message } from 'antd'
import { useParamsContext } from 'libs/context/paramsProvider'
import { operate } from 'pages/tradePlan/config/operate'
import { exportExcel } from 'libs/utils/excel'
import { columns } from 'pages/tradePlan/config/table'
import { tradePlanDelete } from 'libs/api/trade-plan'
import { useQueryClient } from 'react-query'
import { modelHandler } from 'libs/utils/model'
import { useNavigate } from 'react-router-dom'
import dialogJsx from 'libs/utils/dialogJsx'
import UploadForm from '../upload'
import { isEmpty } from 'lodash'
import { submitType } from 'libs/types/formField'

// 目前electron不支持fetch FormData 暂时用axios
import axios from 'axios'
import util from 'libs/utils/util'

const TradePlanOperation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { selectsRow } = useParamsContext()

  const addImpl = () => {
    navigate('/TradePlan/add')
  }

  const uploadImpl = () => {
    dialogJsx(UploadForm, {
      dialogConfig: {
        title: '上传计划',
      },
      restsProps: {
        callback: async (destroyDialog: () => void, ...args: submitType) => {
          const [value, suc, err] = args
          const file = new FormData()
          file.append('file', value.upload[0].originFileObj)
          try {
            const data = await axios({
              method: 'post',
              headers: {
                Authorization: 'Bearer ' + util.getStorage('accessToken'),
                'Content-Type': 'multipart/form-data',
              },
              url: 'http://139.224.110.251:8686/api/TradePlan/Import',
              data: file,
            })
            const code = data.data.code
            if (code === 200) {
              suc(data.data.message)
              destroyDialog()
              queryClient.invalidateQueries('trade')
            } else {
              throw new Error(data.data.message)
            }
          } catch (error: any) {
            message.error(error.message)
            err()
          }
        },
      },
    })
  }

  const downloadImpl = () => {
    if (isEmpty(selectsRow)) {
      message.info('请选择需要导出的计划')
      return
    }
    exportExcel(columns, selectsRow)
  }

  const deleteImpl = () => {
    if (isEmpty(selectsRow)) {
      message.info('请选择需要删除的计划')
      return
    }
    modelHandler({
      onOk: async (e: any) => {
        e()
        const ids = selectsRow.map((item) => item.id)
        await tradePlanDelete({ ids })
        queryClient.invalidateQueries('trade')
      },
    })
  }

  const checkoutImpl = (code: string) => {
    switch (code) {
      case 'add':
        addImpl()
        break
      case 'upload':
        uploadImpl()
        break
      case 'download':
        downloadImpl()
        break
      case 'batchDelete':
        deleteImpl()
        break
      default:
        break
    }
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

export default TradePlanOperation
