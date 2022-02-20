import Modal from "antd/lib/modal";

const { confirm } = Modal;

export const modelHandler = ({
  onOk,
  okText = "确定",
  cancelText = "取消",
  title = "删除",
  text = "您确定要删除当前数据么",
  onCancel,
}: any) => {
  confirm({
    title,
    okText,
    cancelText,
    content: text,
    onOk() {
      onOk();
    },
    onCancel() {
      onCancel?.();
    },
  });
};
