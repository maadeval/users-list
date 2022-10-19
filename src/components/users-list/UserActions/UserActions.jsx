import { useState } from "react"
import ButtonIcon from "../../ButtonIcon"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import Modal from "../../Modal/Modal"
import UsersListDeleteForm from "../UsersListDeleteForm/UsersListDeleteForm"
import UsersListEditForm from "../UsersListEditForm"

const UserActions = ({ user }) => {
  const { modalContent, closeModal, openEditModal, openDeleteModal } =
    useModal(user)

  return (
    <>
      <Modal closeModal={closeModal}>{modalContent}</Modal>
      <ButtonIcon icon={PencilIcon} onClick={openEditModal} />
      <ButtonIcon icon={TrashIcon} variant="red" onClick={openDeleteModal} />
    </>
  )
}

const useModal = user => {
  const [modalContent, setModalContent] = useState()

  const closeModal = () => setModalContent()

  const openEditModal = () =>
    setModalContent(
      <UsersListEditForm currentUser={user} closeModal={closeModal} />
    )

  const openDeleteModal = () =>
    setModalContent(
      <UsersListDeleteForm currentUser={user} closeModal={closeModal} />
    )

  return { modalContent, closeModal, openEditModal, openDeleteModal }
}

export default UserActions
