import UploadForm from './upload'
import { submitType } from 'libs/types/formField'

// 目前electron不支持fetch FormData 暂时用axios
import axios from 'axios'
import util from 'libs/utils/util'
import { message } from 'antd'

const TradeSchedule = () => {
  const callback = async (...args: submitType) => {
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
        url: 'http://139.224.110.251:8686/api/TradePath/ImportTradePath',
        data: file,
      })
      const code = data.data.code
      if (code === 200) {
        suc(data.data.message)
      } else {
        throw new Error(data.data.message)
      }
    } catch (error: any) {
      message.error(error.message)
      err()
    }
  }

  return (
    <div style={{ width: 500 }}>
      <UploadForm callback={callback} />
    </div>
  )
}

export default TradeSchedule
