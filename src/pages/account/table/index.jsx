import {Spin} from "antd";
import {useParamsContext} from "../../../libs/context/paramsProvider";
import {useListQuery} from "../../../libs/hooks";
import {getUserList} from "../../../libs/api/account-api";
import AccountTableJsx from "./accountTable";

const AccountTable = () => {
  const { params } = useParamsContext();
  const { data = {}, isLoading } = useListQuery(
    {
      queryKey: "account",
      api: getUserList,
    },
    params
  );
  return (
    <Spin spinning={isLoading}>
      <AccountTableJsx
        params={params}
        queryKey={"account"}
        rowKey={"id"}
        data={data}
      />
    </Spin>
  )
}

export default AccountTable;