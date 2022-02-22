import Add from "./add";
import AccountTable from "./table";
import AccountSearch from "./accountSearch";

const Account = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <AccountSearch/>
        <Add />
      </div>
      <AccountTable/>
    </>
  )
}

export default Account;
