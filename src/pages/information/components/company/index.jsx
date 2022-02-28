import CompanyTable from "./companyTable";
import CompanySearch from "./companySearch";
import CompanyDownload from "./companyDownload";
import AddBtn from "./addCompany/addBtn";
import {Space} from "antd";

const Company = () => {
  return (
    <>
      <div className={'topFlex'}>
        <CompanySearch/>
        <Space>
          <AddBtn/>
          <CompanyDownload/>
        </Space>
      </div>
      <CompanyTable/>
    </>
  )
}

export default Company;
