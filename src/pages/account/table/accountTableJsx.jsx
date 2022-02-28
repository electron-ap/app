import TableJsx from "../../../components/table";
import {columns} from "./columns";
import {delUser, editUser} from "../../../libs/api/account-api";
import {useQueryClient} from "react-query";
import {modelHandler} from "../../../libs/utils/model";
import dialogJsx from "../../../libs/utils/dialogJsx";
import AccountForm from "../accountForm";
import util from "../../../libs/utils/util";
import {useState} from "react";

const AccountTableJsx = ({ params, queryKey, ...resetProps }) => {
  const [selectKey] = useState();
  const queryClient = useQueryClient();

  const callback = (actions, data) => {
    switch (actions) {
      case "delete":
        deleteHandler(data);
        break;
      case "edit":
        editHandler(data);
        break;
      default:
        break;
    }
  };

  const editHandler = (data) => {
    console.log(25, data)
    dialogJsx(AccountForm, {
      dialogConfig: {
        title: '编辑账号'
      },
      restsProps: {
        initialValues: data,
        callback: async(destoryImplement, value, suc, error) => {
          try {
            console.log(34, value);
            const account = util.getStorage('__authInfo__').name;
            const id = data.id;
            await editUser({...value, account, id})
            suc();
            await queryClient.invalidateQueries('user');
            destoryImplement()
          } catch (err) {
            error();
          }
        }
      }
    })
  }

  const deleteHandler =  (data) => {
    modelHandler({
      onOk: async(e)=> {
        e();
        await delUser({'id': data.id});
        await queryClient.invalidateQueries('account');
      }
    })
  }

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
      callback={callback}
      {...resetProps}
      columns={columns}
    />
  )
}

export default AccountTableJsx
