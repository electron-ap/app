import Button from "antd/lib/button";
import {PlusCircleOutlined} from "@ant-design/icons";
import AddForm from "./components/addForm";
import dialogJsx from "../../../libs/utils/dialogJsx";
import {addUserList} from "../../../libs/api/account-api";
// import {useQueryClient} from "react-query";
import {message} from 'antd';
import util from "../../../libs/utils/util";

const Add = () => {

  // const queryClient = useQueryClient();
  const handleModal =  () => {
    dialogJsx(AddForm, {
      dialogConfig: {
        title: '创建账号'
      },
      restsProps: {
        callback: async(props, destoryImplement) => {
          try {
            const [value, suc] = props;
            const account = util.getStorage('__authInfo__').name
            console.log(24, {...value, account})
            const response =await addUserList({...value, account});
            await suc(response.message);
            // queryClient.invalidateQueries(['user', params]);
            destoryImplement()
          }catch (err) {
            message.error(err)
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
