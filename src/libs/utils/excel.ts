import * as XLSX from "xlsx";
import dayjs from "dayjs";
import _ from "lodash";
/**
 *  导出报表
 * @param {列表配置项} listColumns
 * @param {数据项} resData
 * @param {文件名} fileName
 */
export const exportExcel = (
  listColumns: Array<any>,
  resData: Array<any>,
  fileName = "导出计划"
) => {
  // 合成表头（剔除排除项）
  const columns = listColumns.map((item) => item.title);
  const xlsxData = [columns];
  // 合成数据
  resData.forEach((item: any) => {
    let rowValue: any[] = [];
    listColumns.forEach((column: any) => {
      // console.log(item)
      let value = "";
      if (_.isFunction(column.render)) {
        value = column.render();
      } else {
        value = _.get(item, column.dataIndex, "");
      }
      rowValue.push(value);
    });
    xlsxData.push(rowValue);
  });

  // 创建表格
  const ws = XLSX.utils.aoa_to_sheet(xlsxData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // 导出表格
  XLSX.writeFile(wb, setFileName(fileName));
};

function setFileName(fileName: string) {
  return fileName + dayjs(Date.now()).format("YYYY-MM-DD") + ".xlsx";
}
