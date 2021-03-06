import {columns} from "./columns";
import TableJsx from "../../../../../components/table";
import dialogJsx from "../../../../../libs/utils/dialogJsx";
import LinkForm from "../linkForm";

const CompanyTableJsx = ({ params, queryKey, ...resetProps }) => {
  const callback = (actions, data) => {
    switch (actions) {
      case "linkCompany":
        linkCompanyHandler(data);
        break;
      default:
        break;
    }
  };

  const linkCompanyHandler = (data) => {
    dialogJsx(LinkForm, {
      dialogConfig: {
        title: '关联公司'
      },
      restsProps: {
        initialValues: {
          CName: data.name,
        },
        tableItemRecord: data
      }
    })
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
