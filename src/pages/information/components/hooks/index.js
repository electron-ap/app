import dialogJsx from '../../../../libs/utils/dialogJsx'
import LinkForm from '../company/linkForm'

function useInformation() {
  const linkCompanyHandler = (data) => {
    dialogJsx(LinkForm, {
      dialogConfig: {
        title: '关联公司',
      },
      restsProps: {
        initialValues: {
          CName: data.name,
        },
        tableItemRecord: data,
      },
    })
  }

  const linkTagHandler = (data) => {
    dialogJsx(LinkForm, {
      dialogConfig: {
        title: '关联tag',
      },
      restsProps: {
        initialValues: {
          CName: data.name,
        },
        tableItemRecord: data,
      },
    })
  }

  return {
    linkCompanyHandler,
    linkTagHandler,
  }
}

export default useInformation
