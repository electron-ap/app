import Button from "antd/lib/button";
import {PlusCircleOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import {useState} from "react";
import AddForm from "./components/addForm";

const Add = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined/>} onClick={() => setShowModal(true)}>创建账号</Button>
      <Modal
        title={'创建账号'}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <AddForm/>
      </Modal>
    </>
  )
}

export default Add;
