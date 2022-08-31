import DisplayName from "../../DisplayName/DisplayName"
import UserRole from "../UserRole"
import UserStatus from "../UserStatus"

import style from "./UserRow.module.css"

const UserRow = ({ username, role, active, name, avatar }) => {
  return (
    <article className={style.row} key={username}>
      <DisplayName avatar={avatar} name={name} username={username} />
      <UserStatus status={active} />
      <UserRole role={role} />
    </article>
  )
}

export default UserRow
