import ButtonIcon from "../../ButtonIcon"
import CrossIcon from "../../icons/CrossIcon/CrossIcon"

import style from "./UsersFormLayout.module.css"

const UsersFormLayout = ({ children, onClose }) => (
  <div className={style.wrapper}>
    {children}
    <ButtonIcon
      className={style.close}
      icon={CrossIcon}
      isFill
      onClick={onClose}
    />
  </div>
)

export default UsersFormLayout
