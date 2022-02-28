import {Spin} from "antd";
import {useListQuery} from "../../../../../libs/hooks";
import {getCompanyList} from "../../../../../libs/api/information-api";
import {useParamsContext} from "../../../../../libs/context/paramsProvider";
import CompanyTableJsx from "./companyTableJsx";
import {useState} from "react";

const CompanyTable = () => {
  const [selectKey, setSelectKey] = useState();
  const { params, setSelectsRow } = useParamsContext();

  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: "company",
      api: getCompanyList,
    },
    params
  );

  const onSelectChange = (key, selectedRows) => {
    setSelectKey(key);
    setSelectsRow(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys: selectKey,
    onChange: onSelectChange,
  };
  return (
    <Spin spinning={isLoading}>
      <CompanyTableJsx
        rowSelection={rowSelection}
        params={params}
        queryKey={"company"}
        rowKey={"id"}
        data={data}
      />
    </Spin>
  )
}

export default CompanyTable;
