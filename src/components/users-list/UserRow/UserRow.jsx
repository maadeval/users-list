import DisplayName from "../../DisplayName/DisplayName"
import UserActions from "../UserActions/UserActions"
import UserRole from "../UserRole"
import UserStatus from "../UserStatus"

import style from "./UserRow.module.css"

const UserRow = ({ user }) => (
  <article className={style.row} key={user.username}>
    <DisplayName
      avatar={user.avatar}
      name={user.name}
      username={user.username}
    />
    <UserStatus status={user.active} />
    <UserRole role={user.role} />
    <div className={style.buttonWrapper}>
      <UserActions user={user} />
    </div>
  </article>
)

export default UserRow
