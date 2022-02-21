import TableJsx from "../../../components/table";
import {columns} from "./columns";
import {delUser} from "../../../libs/api/account-api";
import {useQueryClient} from "react-query";

const AccountTableJsx = ({ params, queryKey, ...resetProps }) => {
  const queryClient = useQueryClient();
  const callback = (actions, data) => {
    switch (actions) {
      case "delete":
        deleteHandler(data);
        break;
      default:
        break;
    }
  };

  const deleteHandler = async (data, destoryImplement) => {
    console.log(19, data.id);
    const res = await delUser({'id': data.id});
    console.log(16, res);
    queryClient.invalidateQueries(['user', params]);
    destoryImplement()
  }


  return (
    <TableJsx
      callback={callback}
      {...resetProps}
      columns={columns}
    />
  )
}

export default AccountTableJsx
