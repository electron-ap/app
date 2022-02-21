import DynamicForm from "../../../../../components/form";
import {addFormConfig} from "./confg";

const AddForm = () => {
  const onSubmit = (a) => {
    console.log(a)
  }

  return (
    <>
      <DynamicForm {...addFormConfig} onSubmit={onSubmit}/>
    </>
  )
}

export default AddForm
