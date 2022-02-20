import {useEffect, useState} from "react";
import {Row, Col, Switch} from 'antd';
import {getSettingList, setSettingItem} from "../../libs/api/system-api";
import Remind from "./components/remind";
import debounce from "lodash/debounce";

const System = () => {
  const [configArr, setConfigArr] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getSwitchList()
  }, [])

  const getSwitchList = async () => {
    let result = await getSettingList()
    setConfigArr(result.list);
  }

  const changeVal = (param, val) => {
    setLoading(true)
    debounce(async() => {
      await setSettingItem({
        "seting_code": param,
        "status": val
      }).finally(() => {
        setLoading(false)
      })
      await getSwitchList()
    }, 800)()
  }

  return (
    <>
      <Row style={{
        margin: '0 auto',
        width: 900,
      }}>
        {
          configArr.map(item => {
            return (
              <Col
                span={8}
                key={item.seting_code}
                style={{height: 70, textAlign: "right"}}
              >
                <span style={{marginRight: 20}}>{item.name}</span>
                <Switch
                  loading = {loading}
                  defaultChecked={item.status}
                  onChange={changeVal.bind(null, item.seting_code)}
                />
                {
                  item.seting_code === "JHSBTX" && item.status ?
                    <Remind/> : null
                }
              </Col>
            )
          })
        }
      </Row>

    </>
  )
}

export default System;
