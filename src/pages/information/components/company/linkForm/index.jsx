import DynamicForm from "../../../../../components/form";
import {formFields, item, itemImpl} from "./config";
import {useEffect, useRef, useState} from "react";
import values from "lodash/values"
import sortedUniq from "lodash/sortedUniq";

import './style.scss'
import {getLinkCompanyList, LinkCompanyList} from "../../../../../libs/api/information-api";
import {message} from "antd";
import {useQueryClient} from "react-query";

const LinkForm = ({tableItemRecord, destroyDialog, callback, ...restProps}) => {
  // const queryClient = useQueryClient();
  const [value, setValue] = useState(0);
  const [config, setConfig] = useState(formFields);

  useEffect(() => {
    callback()
    console.log(18, tableItemRecord)
  }, [])

  useEffect(() => {
    let wrap = document.querySelector('#addCon');

    let handleButtonAction = (e) => {
      const button = e.target.closest('button');
      if(!button) return;
      const action = button.dataset.type;
      const id = button.dataset.id
      switch (action) {
        case 'add':
          handleAdd();
          break;
        case 'reduce':
          handleReduce(id);
          break;
        default:
          break;
      }
    }
    wrap.addEventListener('click', handleButtonAction)
    return () => wrap.removeEventListener('click', handleButtonAction);
  })

  const handleAdd = async () => {
    const id = new Date().valueOf();
    const options = await getLinkCompanyList({
      parentCompanyID: tableItemRecord.id
    })
    const item = itemImpl('关联公司', id, options);
    setConfig(prev => prev.concat(item));
  }

  const handleReduce = (id) => {
    let result = config.filter((arrItem) => {
      return arrItem.name+'' !==  id
    })
    setConfig(result)
  }

  const onFinish = async (...params) => {
    const [result, suc] = params
    const parentCompanyID = tableItemRecord.id;
    const childrenCompanyIds = values(result);
    childrenCompanyIds.shift()
    console.log(result, sortedUniq(childrenCompanyIds));
    await LinkCompanyList({
      parentCompanyID,
      childrenCompanyIds: sortedUniq(childrenCompanyIds)
    })
    suc()
    // await queryClient.invalidateQueries('company');
    destroyDialog()
  }

  return (
    <div id={'addCon'} onClick={() => setValue(value+1)}>
      <DynamicForm onSubmit={onFinish} fields={config} saveText={'保存'} {...restProps}/>
    </div>
  )
}

export default LinkForm;
