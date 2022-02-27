import Button from "antd/lib/button";
import dialogJsx from "../../../../../libs/utils/dialogJsx";
import LinkForm from "../linkForm";

const AddLinkCompany = () => {
  const handleModal = () => {
    dialogJsx(LinkForm, {
      dialogConfig: {
        title: 'aaa'
      }
    })
  }
  return (
    <>
      <Button onClick={handleModal}>Button</Button>
    </>
  )
}

export default AddLinkCompany;