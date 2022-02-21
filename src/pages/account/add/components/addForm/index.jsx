import DynamicForm from "../../../../../components/form";
import debounce from "lodash/debounce";
import {addFormConfig} from "./confg";
import {addUserList} from "../../../../../libs/api/account-api";

const AddForm = () => {

  const onSubmit = debounce((...params) => {
    const [value, suc] = params;
    addUserList(value);
    suc();
  }, 200)

  return (
    <>
      <DynamicForm {...addFormConfig} onSubmit={onSubmit}/>
    </>
  )
}

export default AddForm
