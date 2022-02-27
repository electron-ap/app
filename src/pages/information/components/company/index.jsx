import {useEffect} from "react";
import {getCompanyList} from "../../../../libs/api/product-api";
import CompanyTable from "./companyTable";
import CompanySearch from "./companySearch";
import AddLinkCompany from "./addLinkCompany";

const Company = () => {
  useEffect(() => {
    getCompanyList().then(res => {
      console.log(res);
    })
  }, [])

  return (
    <>
      Company
      <AddLinkCompany/>
      <CompanySearch/>
      <CompanyTable/>
    </>
  )
}

export default Company;
