import Button from "antd/lib/button";
import { BaseButtonProps } from "antd/lib/button/button";

export declare interface actionsType extends BaseButtonProps {
  code: string;
  name: string;
  style?: object;
}

const ActionsJsx = ({
  record,
  actions,
}: {
  record: object;
  actions: Array<actionsType>;
}) => (
  <>
    {actions.map(({ code, name, ...restProps }) => (
      <Button
        {...restProps}
        key={code}
        data-record={JSON.stringify(record)}
        data-action={code}
      >
        {name}
      </Button>
    ))}
  </>
);

export default ActionsJsx;
