import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import { ConfigProvider } from 'antd'
import AuthorityProvider from 'libs/context/authorityProvider'
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <AuthorityProvider>
      <App />
    </AuthorityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
)
