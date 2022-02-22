import Button from "antd/lib/button";
import {PlusCircleOutlined} from "@ant-design/icons";
import AccountForm from "../accountForm";
import dialogJsx from "../../../libs/utils/dialogJsx";
import {addUserList} from "../../../libs/api/account-api";
import util from "../../../libs/utils/util";
import {useQueryClient} from "react-query";

const Add = () => {

  const queryClient = useQueryClient();
  const handleModal =  () => {
    dialogJsx(AccountForm, {
      dialogConfig: {
        title: '创建账号'
      },
      restsProps: {
        callback: async(destoryImplement, value, suc, error) => {
          try {
            const account = util.getStorage('__authInfo__').name
            await addUserList({...value, account})
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
  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined/>} onClick={handleModal}>创建账号</Button>
    </>
  )
}

export default Add;
