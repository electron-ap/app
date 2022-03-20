import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import _ from 'lodash'
/**
 *  导出报表
 * @param {列表配置项} listColumns
 * @param {数据项} resData
 * @param {文件名} fileName
 */
export const exportExcel = (
  listColumns: Array<any>,
  resData: Array<any>,
  fileName = '导出Excel',
) => {
  // 合成表头（剔除排除项）
  const columns = []
  for (let i = 0, item; (item = listColumns[i++]); ) {
    if (item.noExcel) continue
    columns.push(item.title)
  }
  const xlsxData = [columns]
  // 合成数据
  for (let ind = 0, item; (item = resData[ind++]); ) {
    let rowValue: any[] = []
    for (let i = 0, column; (column = listColumns[i++]); ) {
      if (column.noExcel) continue
      let value = _.get(item, column.dataIndex, '')
      if (_.isFunction(column.render)) {
        value = column.render(value, item, ind)
      }
      rowValue.push(value)
    }
    xlsxData.push(rowValue)
  }

  // 创建表格
  const ws = XLSX.utils.aoa_to_sheet(xlsxData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // 导出表格
  XLSX.writeFile(wb, setFileName(fileName))
}

function setFileName(fileName: string) {
  return fileName + dayjs(Date.now()).format('YYYY-MM-DD') + '.xlsx'
}
