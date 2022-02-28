import Input from "antd/lib/input";
const { Search } = Input;

export default function SearchField({ ...extraProps }) {
  return <Search {...extraProps} />;
}
