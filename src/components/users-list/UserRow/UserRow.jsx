import { useState } from "react"
import ButtonIcon from "../../ButtonIcon"
import DisplayName from "../../DisplayName/DisplayName"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import Modal from "../../Modal/Modal"
import UserRole from "../UserRole"
import UsersListDeleteForm from "../UsersListDeleteForm/UsersListDeleteForm"
import UsersListEditForm from "../UsersListEditForm"
import UserStatus from "../UserStatus"

import style from "./UserRow.module.css"

const UserRow = ({ id, username, role, active, name, avatar }) => {
  const [modalContent, setModalContent] = useState()

  return (
    <>
      <Modal closeModal={() => setModalContent()}>{modalContent}</Modal>
      <article className={style.row} key={username}>
        <DisplayName avatar={avatar} name={name} username={username} />
        <UserStatus status={active} />
        <UserRole role={role} />
        <div className={style.buttonWrapper}>
          <ButtonIcon
            icon={PencilIcon}
            onClick={() =>
              setModalContent(
                <UsersListEditForm
                  currentUser={{ id, name, username, role, active }}
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
                  currentUser={{ id, name }}
                  closeModal={() => setModalContent()}
                />
              )
            }
          />
        </div>
      </article>
    </>
  )
}

export default UserRow
