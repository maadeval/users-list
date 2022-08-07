import { ROLE_OPTIONS } from "../../constants/sort-users-select"
import style from "./UserRole.module.css"

const ROLE_STYLES = {
  [ROLE_OPTIONS.TEACHER]: ["Profesor", style.teacher],
  [ROLE_OPTIONS.STUDENT]: ["Estudiante", style.student],
  [ROLE_OPTIONS.OTHER]: ["Otro", style.other],
}

const UserRole = ({ role }) => {
  const [roleName, roleClassname] = ROLE_STYLES[role] || ROLE_STYLES.other

  return <span className={`${style.role} ${roleClassname}`}>{roleName}</span>
}

export default UserRole
