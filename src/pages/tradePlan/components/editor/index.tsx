import { editorPlan, getDetailPlan } from "libs/api/trade-plan";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TradePlanAdd from "../add";
import { submitType } from "libs/types/formField";
import AddAndEditor from "../addAndEditor/addAndEditor";
import { Spin } from "antd";

interface initialType {
  [v: string]: unknown;
}

const TradePlanEditor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  let [searchParams] = useSearchParams();
  const [initialValues, setValue] = useState<any>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const result = await getDetailPlan({ id });
          const { products, ...ticket } = result;
          const initialValue = products.reduce(
            (total: initialType, item: initialType, index: number) => {
              total[index] = item;
              return total;
            },
            {}
          );
          setValue({ ticket, ...initialValue });
        } catch (error) {
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  const submitImpl = async (...args: submitType) => {
    let [value, suc, err] = args;
    try {
      const result = await editorPlan({
        ...value,
        planID: searchParams.get("id"),
      });
      suc();
    } catch (error) {
      err();
    }
  };

  return (
    <Spin spinning={loading}>
      {initialValues ? (
        <AddAndEditor submitImpl={submitImpl} initialValues={initialValues} />
      ) : null}
    </Spin>
  );
};

export default TradePlanEditor;
