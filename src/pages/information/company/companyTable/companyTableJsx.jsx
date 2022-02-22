import {columns} from "./columns";
import TableJsx from "../../../../components/table";

const CompanyTableJsx = ({ params, queryKey, ...resetProps }) => {
  const callback = (actions, data) => {
    switch (actions) {
      case "linkCompany":
        linkCompanyHandler(data);
        break;
      default:
        break;
    }
    console.log(actions, data);
  };

  const linkCompanyHandler = (a,b) => {
    console.log(a, b)
  }
  return (
    <TableJsx
      callback={callback}
      {...resetProps}
      columns={columns}
    />
  )
}

export default CompanyTableJsx;