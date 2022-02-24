import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";

export const TitleAndButton = () => {
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
        data-action="add"
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />
    </div>
  );
};

export const MinusButton = ({ id }: { id: string }) => {
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
        data-action="reduce"
        data-id={id}
        danger
        type="primary"
        shape="circle"
        icon={<MinusOutlined />}
      />
    </div>
  );
};
