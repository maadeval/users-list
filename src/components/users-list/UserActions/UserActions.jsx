import { useState } from "react"
import ButtonIcon from "../../ButtonIcon"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import Modal from "../../Modal/Modal"
import UsersListDeleteForm from "../UsersListDeleteForm/UsersListDeleteForm"
import UsersListEditForm from "../UsersListEditForm"

const UserActions = ({ user }) => {
  const [modalContent, setModalContent] = useState()

  return (
    <>
      <Modal closeModal={() => setModalContent()}>{modalContent}</Modal>
      <ButtonIcon
        icon={PencilIcon}
        onClick={() =>
          setModalContent(
            <UsersListEditForm
              currentUser={user}
              closeModal={() => setModalContent()}
            />
          )
        }
      />
      <ButtonIcon
        icon={TrashIcon}
        variant="red"
        onClick={() =>
          setModalContent(
            <UsersListDeleteForm
              currentUser={user}
              closeModal={() => setModalContent()}
            />
          )
        }
      />
    </>
  )
}

export default UserActions
