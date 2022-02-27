import {columns} from "./columns";
import TableJsx from "../../../../../components/table";

const ProductTableJsx = ({ params, queryKey, ...resetProps }) => {
  return(
    <TableJsx
      {...resetProps}
      columns={columns}
    />
  )
}

export default ProductTableJsx;