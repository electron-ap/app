import {Modal} from "antd";
import {useState} from "react";
import RemindForm from "../remindForm";

const Remind = () => {
  const [modalShow, setModalShow] = useState(false)
  return (
    <>
      <h4 style={{
        color: '#1989FA',
        fontSize: 14,
        marginRight: 64,
        marginTop: 8,
        cursor: 'pointer'
      }} onClick={() => setModalShow(true)}>设置提醒时间</h4>
      <Modal
        title="Basic Modal"
        width={600}
        visible={modalShow}
        onCancel={() => setModalShow(false)}
        footer={null}
      >
        <RemindForm/>
      </Modal>
    </>
  )
}

export default Remind;
