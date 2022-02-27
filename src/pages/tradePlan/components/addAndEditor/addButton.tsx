import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";

export const TitleAndButton = ({ add }: { add: () => void }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 15,
        borderBottom: "dotted 1px #ddd",
      }}
    >
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
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 15,
        borderBottom: "dotted 1px #ddd",
      }}
    >
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
