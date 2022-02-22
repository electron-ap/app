import ReactDOM from "react-dom";
import { Modal, ModalProps } from "antd";
import { ReactNode } from "react";

const diaglogJsx = (
  DialogComponent: any,
  props: {
    dialogConfig: JSX.IntrinsicAttributes &
      ModalProps & { children?: ReactNode };
    restsProps: any;
  }
) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  function render() {
    ReactDOM.render(
      <Modal
        visible={true}
        footer={null}
        {...props.dialogConfig}
        onCancel={destroyDialog}
      >
        <DialogComponent destroyDialog={destroyDialog} {...props.restsProps} />
      </Modal>,
      container
    );
  }

  function destroyDialog() {
    // Allow calling chain to roll up, and then destroy component
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }, 10);
  }

  render();
};

export default diaglogJsx;
