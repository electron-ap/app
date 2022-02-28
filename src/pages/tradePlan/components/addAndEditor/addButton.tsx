import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";

export const TitleAndButton = ({ add }: { add: () => void }) => {
  return (
    <div className={"title"}>
      <h1 style={{ fontSize: 16 }}>贸易计划：产品</h1>
      <Button
        onClick={add}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export const MinusButton = ({
  id,
  reduce,
}: {
  id: string;
  reduce: (e: string) => void;
}) => {
  return (
    <div className={"title"} style={{ justifyContent: "flex-end" }}>
      <Button
        onClick={reduce.bind(null, id)}
        danger
        type="primary"
        shape="circle"
        icon={<MinusOutlined />}
      />
    </div>
  );
};
