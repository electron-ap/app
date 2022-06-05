import TableJsx from "../../../components/table";
import {columns} from "./columns";
import {useState} from "react";

const AccountTableJsx = ({ params, queryKey, ...resetProps }) => {
  const [selectKey] = useState();

  const onSelectChange = (a, b) => {
    console.log(a, b)
  }

  const rowSelection = {
    selectedRowKeys: selectKey,
    onChange: onSelectChange,
  };




  return (
    <TableJsx
      rowSelection={rowSelection}
      {...resetProps}
      columns={columns}
    />
  )
}

export default AccountTableJsx
