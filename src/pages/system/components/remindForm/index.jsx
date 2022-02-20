import DynamicForm from "../../../../components/form";
import formFields from "./config";
const RemindForm = () => {
  const onFinish = (params, suc, err) => {
    console.log(params)
    suc()
  }

  return (
    <DynamicForm
      onSubmit={onFinish}
      fields={formFields}
      saveText={'保存'}
    />

  )
}

export default RemindForm;
