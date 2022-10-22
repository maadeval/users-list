import { useState } from "react"
import { useDropdown } from "../../../lib/hooks/useDropdown"
import ButtonIcon from "../../ButtonIcon"
import DotsIcon from "../../icons/DotsIcon/DotsIcon"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import PictureIcon from "../../icons/PictureIcon/PictureIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import Modal from "../../Modal/Modal"
import UsersListDeleteForm from "../UsersListDeleteForm/UsersListDeleteForm"
import UsersListEditForm from "../UsersListEditForm"
import UsersListPicForm from "../UsersListPicForm/UsersListPicForm"

import style from "./UserActions.module.css"

const UserActions = ({ user }) => {
  const {
    modalContent,
    closeModal,
    openEditModal,
    openDeleteModal,
    openPicModal,
  } = useModal(user)
  const { dropdownRef, dropdownOpened, openDropdown, closeDropdown } =
    useDropdown()

  return (
    <div className={style.wrapper}>
      <Modal closeModal={closeModal}>{modalContent}</Modal>
      <ButtonIcon icon={DotsIcon} onClick={openDropdown} />
      {dropdownOpened && (
        <ul
          ref={dropdownRef}
          onClick={() => {
            closeDropdown()
          }}
          className={style.dropdown}>
          <li onClick={openEditModal}>
            <PencilIcon width={16} />
            <span>Editar</span>
          </li>
          <li onClick={openPicModal}>
            <PictureIcon width={16} />
            <span>Editar foto</span>
          </li>
          <li onClick={openDeleteModal}>
            <TrashIcon width={16} />
            <span>Eliminar</span>
          </li>
        </ul>
      )}
    </div>
  )
}

const useModal = user => {
  const [modalContent, setModalContent] = useState()

  const closeModal = () => setModalContent()

  const openEditModal = () =>
    setModalContent(
      <UsersListEditForm currentUser={user} closeModal={closeModal} />
    )

  const openPicModal = () =>
    setModalContent(
      <UsersListPicForm currentUser={user} closeModal={closeModal} />
    )

  const openDeleteModal = () =>
    setModalContent(
      <UsersListDeleteForm currentUser={user} closeModal={closeModal} />
    )

  return {
    modalContent,
    closeModal,
    openEditModal,
    openDeleteModal,
    openPicModal,
  }
}

export default UserActions
