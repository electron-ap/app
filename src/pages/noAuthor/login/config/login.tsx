import { FieldType } from 'libs/types/formField'
import user from 'assets/static/zhanghao.png'
import password from 'assets/static/mima.png'

const fieldsForm: Array<FieldType> = [
  {
    name: 'user',
    type: 'text',
    label: '',
    rules: [{ required: true, message: '请输入账号' }],
    extraProps: {
      prefix: <img alt={'user'} src={user} width={20} />,
      placeholder: '请输入账号',
      style: {
        height: 50,
      },
    },
  },
  {
    name: 'password',
    type: 'text',
    label: '',
    rules: [{ required: true, message: '请输入登陆密码' }],
    extraProps: {
      prefix: <img alt={'password'} src={password} width={20} />,
      placeholder: '请输入登陆密码',
      style: {
        height: 50,
      },
      type: 'password',
    },
  },
]

export default fieldsForm
