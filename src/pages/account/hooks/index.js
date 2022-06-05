import dialogJsx from '../../../libs/utils/dialogJsx'
import AccountForm from '../accountForm'
import { delUser, editUser } from '../../../libs/api/account-api'
import { modelHandler } from '../../../libs/utils/model'
import { useQueryClient } from 'react-query'

function useAccount() {
  const queryClient = useQueryClient()
  const editHandler = (data) => {
    dialogJsx(AccountForm, {
      dialogConfig: {
        title: '编辑账号',
      },
      restsProps: {
        saveText: '保存',
        initialValues: { ...data, rolesId: data.roles.roleId },
        callback: async (destoryImplement, value, suc, error) => {
          try {
            const id = data.id
            await editUser({ ...value, id })
            suc()
            await queryClient.invalidateQueries('account')
            destoryImplement()
          } catch (err) {
            error()
          }
        },
      },
    })
  }

  const deleteHandler = (data) => {
    modelHandler({
      onOk: async (e) => {
        e()
        await delUser({ id: data.id })
        await queryClient.invalidateQueries('account')
      },
    })
  }

  return {
    deleteHandler,
    editHandler,
  }
}

export default useAccount
