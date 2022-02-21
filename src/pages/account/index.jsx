import {useEffect} from "react";
import {getUserList} from "../../libs/api/account-api";
import Add from "./add";
import AccountTable from "./table";

const Account = () => {
  useEffect(() => {
    getUserList().then(res => {
      console.log(res)
    })
  }, [])
  return (
    <>
      <Add />
      <AccountTable/>
    </>
  )
}

export default Account;
