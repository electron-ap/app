import Button from "antd/lib/button";
import {PlusCircleOutlined} from "@ant-design/icons";
import AccountForm from "../accountForm";
import dialogJsx from "../../../libs/utils/dialogJsx";
import {addUserList} from "../../../libs/api/account-api";
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
            await addUserList(value)
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
  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined/>} onClick={handleModal}>创建账号</Button>
    </>
  )
}

export default Add;
