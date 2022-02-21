import {useEffect} from "react";
import {getUserList} from "../../libs/api/account-api";
import Add from "./add";

const Account = () => {
  useEffect(() => {
    getUserList().then(res => {
      console.log(res)
    })
  }, [])
  return (
    <>
      <Add />
    </>
  )
}

export default Account;
