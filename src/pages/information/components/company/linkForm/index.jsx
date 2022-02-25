import DynamicForm from "../../../../../components/form";
import {formFields, item, itemImpl} from "./config";
import {useEffect, useState} from "react";

import './style.scss'
import {reduce} from "lodash";

const LinkForm = () => {
  const [value, setValue] = useState(0);
  const [config, setConfig] = useState(formFields);

  useEffect(() => {
    let warp = document.querySelector('#addCon');

    let a = (e) => {
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
    warp.addEventListener('click', a)
    return () => warp.removeEventListener('click', a);
  })

  const handleAdd = () => {
    const id = new Date().valueOf();
    const item = itemImpl(id);
    setConfig(prev => prev.concat(item));
  }

  const handleReduce = (id) => {
    let result = config.filter((arrItem) => {
      console.log(arrItem)
      return arrItem.name+'' !==  id
    })
    setConfig(result)
    // console.log(49, result)
  }

  const onFinish = (a) => {
    console.log(a);
  }

  return (
    <div id={'addCon'} onClick={() => setValue(value+1)}>
      <DynamicForm onSubmit={onFinish} fields={config} saveText={'保存'}/>
    </div>
  )
}

export default LinkForm;