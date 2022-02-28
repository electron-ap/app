import Button from "antd/lib/button";
import {PlusCircleOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddBtn = () => {
  let navigate = useNavigate();
  return (
    <Button type={'primary'} icon={<PlusCircleOutlined />} onClick={() => navigate('/information/addCompany')}>新增公司</Button>
  )
}

export default AddBtn;
