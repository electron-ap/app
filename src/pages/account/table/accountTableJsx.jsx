import TableJsx from "../../../components/table";
import {columns} from "./columns";
import {delUser, editUser} from "../../../libs/api/account-api";
import {useQueryClient} from "react-query";
import {modelHandler} from "../../../libs/utils/model";
import dialogJsx from "../../../libs/utils/dialogJsx";
import AccountForm from "../accountForm";
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
    dialogJsx(AccountForm, {
      dialogConfig: {
        title: '编辑账号'
      },
      restsProps: {
        saveText: '保存',
        initialValues: {...data, rolesId: data.roles.roleId},
        callback: async(destoryImplement, value, suc, error) => {
          try {
            const id = data.id;
            await editUser({...value, id})
            suc();
            await queryClient.invalidateQueries('account');
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
