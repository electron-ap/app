import CompanyTable from "./companyTable";
import CompanySearch from "./companySearch";
import CompanyDownload from "./companyDownload";

const Company = () => {
  return (
    <>
      <div className={'topFlex'}>
        <CompanySearch/>
        <CompanyDownload/>
      </div>
      <CompanyTable/>
    </>
  )
}

export default Company;
