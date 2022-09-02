import ButtonIcon from "../../ButtonIcon"
import DisplayName from "../../DisplayName/DisplayName"
import PencilIcon from "../../icons/PencilIcon/PencilIcon"
import TrashIcon from "../../icons/TrashIcon/TrashIcon"
import UserRole from "../UserRole"
import UserStatus from "../UserStatus"

import style from "./UserRow.module.css"

const UserRow = ({
  id,
  username,
  role,
  active,
  name,
  avatar,
  setDeletePanel,
  setEditPanel,
}) => {
  return (
    <article className={style.row} key={username}>
      <DisplayName avatar={avatar} name={name} username={username} />
      <UserStatus status={active} />
      <UserRole role={role} />
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
    </article>
  )
}

export default UserRow
