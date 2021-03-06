import { useEffect, useRef, useCallback, useState } from "react";
import { Table } from "antd";
import { useParamsContext } from "libs/context/paramsProvider";
import { paramsType } from "libs/types/queryParamsType";
import { TableType } from "libs/types/table";
import isFunction from "lodash/isFunction";

const TableJsx = ({ callback, data, columns, ...props }: TableType) => {
  const { setParams } = useParamsContext();
  const table = useRef<Element | null>(null);
  const [height, setHeight] = useState<string>("0");
  const [width, setWidth] = useState(0);

  // 获取动态高度
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const { width, y } = node.getBoundingClientRect();
      setWidth(width);
      setHeight(`calc(100vh - ${y + 120}px)`);
    }
  }, []);

  // 事件委托 监听表格内部事件
  useEffect(() => {
    table.current = document.querySelector("#table");
    table.current?.addEventListener("click", tableClickImplement, false);

    return () =>
      table.current?.removeEventListener("click", tableClickImplement, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableClickImplement = useCallback(
    (e) => {
      let button = e.target.closest("button");
      if (!button) return;

      if (!table.current?.contains(button)) return;

      const action = button.dataset.action;
      if (!action || !isFunction(callback)) return;
      callback(action, JSON.parse(button.dataset.record));
    },
    [callback]
  );

  return (
    <div id="table" ref={measuredRef}>
      <Table
        {...props}
        bordered
        scroll={{ scrollToFirstRowOnChange: true, x: width, y: height }}
        dataSource={data.list}
        columns={columns}
        pagination={
          data?.total
            ? {
                showQuickJumper: true,
                showTotal: () => `共${data.total}条`,
                pageSize: data.pageSize,
                current: data.currentPage,
                total: Number(data.total),
                size: "small",
                onChange: (current, pageSize) =>
                  setParams((prev: paramsType) => ({
                    ...prev,
                    current,
                    pageSize,
                  })),
              }
            : false
        }
      />
    </div>
  );
};

export default TableJsx;
