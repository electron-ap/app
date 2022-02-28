import DynamicForm from "components/form";
import uploadFields from "pages/tradePlan/config/upload";

const UploadForm = ({
  callback,
  destroyDialog,
}: {
  callback: () => void;
  destroyDialog: () => void;
}) => {
  return (
    <>
      <DynamicForm
        name={"uploadPlan"}
        saveText={"保存"}
        onSubmit={callback.bind(null, destroyDialog)}
        fields={uploadFields}
      />
    </>
  );
};

export default UploadForm;
