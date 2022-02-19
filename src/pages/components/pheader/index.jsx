import {Link, useLocation} from "react-router-dom";

import './style.scss';
import one from './img/1.png';


const PHeader = ({routerArr}) => {
  let navigate = useLocation();

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
                <Link to={item.route} key={item.key}>
                  <li className={navigate.pathname.slice(1)===item.route?'active': ''}>
                    <img src={item.url} alt=""/>
                    <h3>{item.title}</h3>
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </div>
      <div className={'infoWrap'}>
        <div className={"info"}>
          <div className={'lPart'}>
            <h4>LIU WEI</h4>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PHeader
