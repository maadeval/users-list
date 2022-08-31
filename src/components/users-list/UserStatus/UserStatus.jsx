import CheckCircleIcon from "../../icons/CheckCircleIcon/CheckCircleIcon"
import CrossCircleIcon from "../../icons/CrossCircleIcon"

import style from "./UserStatus.module.css"

const UserStatus = ({ status }) => {
  const classStatus = status ? style.active : style.inactive
  const [statusText, Icon] = status
    ? ["Activo", CheckCircleIcon]
    : ["Inactivo", CrossCircleIcon]

  return (
    <div className={classStatus}>
      <Icon className={style.icon} />
      <span>{statusText}</span>
    </div>
  )
}

export default UserStatus
