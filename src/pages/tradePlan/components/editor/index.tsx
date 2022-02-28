import { editorPlan, getDetailPlan } from "libs/api/trade-plan";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitType } from "libs/types/formField";
import AddAndEditor from "../addAndEditor/addAndEditor";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

interface initialType {
  [v: string]: unknown;
}

const TradePlanEditor = () => {
  const navigate = useNavigate();
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
  }, [searchParams]);

  const submitImpl = async (...args: submitType) => {
    let [value, suc, err] = args;
    try {
      await editorPlan({
        ...value,
        planID: searchParams.get("id"),
      });
      suc();
      navigate(-1);
    } catch (error) {
      err();
    }
  };

  return (
    <Spin spinning={loading}>
      {initialValues ? (
        <AddAndEditor
          title={"编辑计划"}
          submitImpl={submitImpl}
          initialValues={initialValues}
        />
      ) : null}
    </Spin>
  );
};

export default TradePlanEditor;
