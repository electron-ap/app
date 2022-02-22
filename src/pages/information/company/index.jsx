import {useEffect} from "react";
import {getCompanyList} from "../../../libs/api/product-api";
import CompanyTable from "./companyTable";
import CompanySearch from "./companySearch";

const Company = () => {
  useEffect(() => {
    getCompanyList().then(res => {
      console.log(res);
    })
  }, [])

  return (
    <>
      <CompanySearch/>
      <CompanyTable/>
    </>
  )
}

export default Company;