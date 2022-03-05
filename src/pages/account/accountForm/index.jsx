import DynamicForm from "../../../components/form";
import debounce from "lodash/debounce";
import {addFormConfig} from "./confg";

const AccountForm = ({callback, destroyDialog, ...restProps}) => {

  const onSubmit = debounce(callback.bind(null, destroyDialog), 200)

  return (
    <>
      <DynamicForm {...addFormConfig} onSubmit={onSubmit} {...restProps}/>
    </>
  )
}

export default AccountForm;
