import TableJsx from "../../../components/table";
import {columns} from "./columns";

const AccountTableJsx = ({ params, queryKey, ...resetProps }) => {
  return (
    <TableJsx
      {...resetProps}
      columns={columns}
    />
  )
}

export default AccountTableJsx