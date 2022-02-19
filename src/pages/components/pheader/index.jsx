import { Routes, Route, Link } from "react-router-dom";

import './style.scss';
import one from './img/1.png';
import two from './img/2.png';
import three from './img/3.png';
import four from './img/4.png';
import five from './img/5.png';
import System from "../../system";
import TradePlan from "../../tradePlan";
import Information from "../../information";
import Account from "../../account";

const routerArr = [
  {
    key: 1,
    url: one,
    title: '贸易计划',
    route: 'TradePlan',
    component: <TradePlan/>
  },
  {
    key: 2,
    url: two,
    title: '贸易排期',
    route: 'Information',
    component: <Information/>
  },
  {
    key: 3,
    url: three,
    title: '信息管理',
    route: 'Information',
    component: <Information/>
  },
  {
    key: 4,
    url: four,
    title: '账户管理',
    route: 'Account',
    component: <Account/>
  },
  {
    key: 5,
    url: five,
    title: '系统设置',
    route: 'about',
    component: <System/>
  }
]



const PHeader = () => {


  const goPage = (route) => {
    window.location.href = `/${route}`;
  }
  return (
    <div className={'pHeaderWrap'}>
      <div className={'pHeader'}>
        <div className={'logoBlc'}>
          <img src={one} alt="" className={'logo'}/>
          <h1>贸易链智慧管理系统</h1>
        </div>
        <ul>
          {
            routerArr.map(item => {
              return (
                <li onClick={goPage.bind(null, item.route)} key={item.key}>
                  <img src={item.url} alt=""/>
                  <h3>{item.title}</h3>
                </li>
              )
            })
          }
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<System />} />
        {
          routerArr.map(item => {
            return (
              <Route path={item.route} element={item.component} key={item.key}/>
            )
          })
        }
      </Routes>
    </div>
  )
}

export default PHeader
