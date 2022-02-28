import Add from "./add";
import AccountTable from "./table";
import AccountSearch from "./accountSearch";

const Account = () => {
  return (
    <>
      <div className={'topFlex'}>
        <AccountSearch/>
        <Add />
      </div>
      <AccountTable/>
    </>
  )
}

export default Account;
