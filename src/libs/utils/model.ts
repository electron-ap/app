import Modal, { ModalProps } from "antd/lib/modal";
import { ReactNode } from "react";

const { confirm } = Modal;
interface modelType extends ModalProps {
  text?: ReactNode;
}
export const modelHandler = ({
  okText = "确定",
  cancelText = "取消",
  title = "删除",
  text = "您确定要删除当前数据么",
  ...props
}: modelType) => {
  confirm({
    title,
    okText,
    cancelText,
    content: text,
    ...props,
  });
};
