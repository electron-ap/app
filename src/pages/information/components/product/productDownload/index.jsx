import {DownloadOutlined} from '@ant-design/icons';
import Button from "antd/lib/button";
import {exportExcel} from "../../../../../libs/utils/excel";
import {columns} from "../productTable/columns"
import {useParamsContext} from "../../../../../libs/context/paramsProvider";

const ProductDownload = () => {
  const { selectsRow } = useParamsContext();

  const download = () => {
    exportExcel(columns, selectsRow);
  }

  return (
    <Button type="primary" onClick={download} icon={<DownloadOutlined />}>下载产品</Button>
  )
}

export default ProductDownload;