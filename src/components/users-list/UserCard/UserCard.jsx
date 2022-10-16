import DisplayName from "../../DisplayName/DisplayName"
import UserActions from "../UserActions/UserActions"
import UserRole from "../UserRole"
import UserStatus from "../UserStatus"

import style from "./UserCard.module.css"

const UserCard = ({ user }) => (
  <article className={style.wrapper} key={user.username}>
    <div className={style.card}>
      <DisplayName avatar={user.avatar} name={name} username={user.username} />
      <div className={style.footer}>
        <div className={style.statusRoleWrapper}>
          <UserRole role={user.role} />
          <UserStatus status={user.active} />
        </div>
        <div className={style.buttonWrapper}>
          <UserActions user={user} />
        </div>
      </div>
    </div>
  </article>
)

export default UserCard
