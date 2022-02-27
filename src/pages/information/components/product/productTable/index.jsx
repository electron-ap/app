import {Spin} from "antd";
import {useListQuery} from "../../../../../libs/hooks";
import {useParamsContext} from "../../../../../libs/context/paramsProvider";
import {getProductList} from "../../../../../libs/api/information-api";
import ProductTableJsx from "./productTableJsx";
import {useState} from "react";

const ProductTable = () => {
  const [selectKey, setSelectKey] = useState();
  const { params, setSelectsRow } = useParamsContext();
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: "product",
      api: getProductList,
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
      <ProductTableJsx
        rowSelection={rowSelection}
        params={params}
        queryKey={"product"}
        rowKey={"id"}
        data={data}
      />
    </Spin>
  )
}

export default  ProductTable;
