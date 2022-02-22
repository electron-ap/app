import Product from "./product";
import Company from "./company";
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";

const Information = () => {
  let navigate = useNavigate();
  const clk = () => {
    console.log(123)
  }
  return (
    <>
      {/*<h1>信息管理</h1>*/}
      {/*<Company/>*/}
      <Button onClick={() => {
        navigate('./tradePlan')
      }}>button</Button>
    </>
  )
}

export default Information
