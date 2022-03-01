import DynamicForm from "components/form";
import uploadFields from "pages/tradeSchedule/config/upload";
import { submitType } from "libs/types/formField";

const UploadForm = ({
  callback,
}: {
  callback: (...args: submitType) => void;
}) => {
  return (
    <>
      <DynamicForm
        name={"uploadPlan"}
        saveText={"保存"}
        onSubmit={callback}
        fields={uploadFields}
      />
    </>
  );
};

export default UploadForm;
