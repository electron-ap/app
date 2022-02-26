import {Link, useLocation, useNavigate} from "react-router-dom";

import './style.scss';
import one from './img/1.png';
import {useEffect, useState} from "react";
import util from "../../libs/utils/util";
import {LogoutOutlined} from "@ant-design/icons";
import {useAuth} from "../../libs/context/authorityProvider";


const PHeader = ({routerArr}) => {
  const {loginOutImplement} = useAuth()
  const [userInfo, setUserInfo] = useState({});

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setUserInfo(util.getStorage('__authInfo__'))
  }, [])

  const goPage = (secondMenu) => {
    navigate(secondMenu.url)
  }

  return (
    <div className={'pHeaderWrap'}>
      <div className={'pHeader'}>
        <div className={'logoBlc'}>
          <img src={one} alt="" className={'logo'}/>
          {/*<h1>贸易链智慧管理系统</h1>*/}
          <h1>诊断PC动态模版Demo</h1>
        </div>
        <ul className={'menu'}>
          {
            routerArr.map(item => {
              return (
                <li className={location.pathname?.split('/')[1] === item.path ? 'active menuItem' : 'menuItem'}
                    key={item.path}>
                  <Link to={`/${item.path}`}>
                    <img src={item.icon} alt=""/>
                    <h3>{item.title}</h3>
                  </Link>
                  {
                    item.secondMenu ?
                      <ul>
                        {
                          item.secondMenu.map((secondMenu, index) => {
                            return (
                              <li key={index} onClick={goPage.bind(null, secondMenu)}>{secondMenu.title}</li>
                            )
                          })
                        }
                      </ul> : null
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={'infoWrap'}>
        <div className={'Breadcrumb'}></div>
        <div className={'info'}>
          <div className={'user'}>
            <h4>{userInfo?.name}</h4>
            <p>{userInfo?.company}</p>
          </div>
          <img src={userInfo?.icon} alt=""/>
          <div className={'logout'} onClick={() => loginOutImplement()}>
            <LogoutOutlined/> 退出登录
          </div>
        </div>
      </div>
    </div>
  )
}

export default PHeader
