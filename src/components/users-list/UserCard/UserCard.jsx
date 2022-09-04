import { useContext } from "react"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import ButtonIcon from "../../ButtonIcon"
import DisplayName from "../../DisplayName/DisplayName"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import UserRole from "../UserRole"
import UserStatus from "../UserStatus"

import style from "./UserCard.module.css"

const UserCard = ({ id, username, role, active, name, avatar }) => {
  const { setEditPanel, setDeletePanel } = useContext(UserFormsContext)

  return (
    <article className={style.wrapper} key={username}>
      <div className={style.card}>
        <DisplayName avatar={avatar} name={name} username={username} />
        <div className={style.footer}>
          <div className={style.statusRoleWrapper}>
            <UserRole role={role} />
            <UserStatus status={active} />
          </div>
          <div className={style.buttonWrapper}>
            <ButtonIcon
              icon={PencilIcon}
              onClick={() => setEditPanel({ id, name, username, role, active })}
            />
            <ButtonIcon
              icon={TrashIcon}
              variant="red"
              onClick={() => setDeletePanel({ id, name })}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default UserCard
