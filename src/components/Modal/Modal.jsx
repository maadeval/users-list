import { createPortal } from "react-dom"
import ButtonIcon from "../ButtonIcon/ButtonIcon"
import CrossIcon from "../icons/CrossIcon/CrossIcon"
import style from "./Modal.module.css"

const Modal = ({ closeModal, children }) => {
  if (!children) return null

  return createPortal(
    <div className={style.overlay}>
      <div className={style.modal}>
        <ButtonIcon
          className={style.close}
          icon={CrossIcon}
          isFill
          onClick={closeModal}
        />
        <span>Hola</span>
      </div>
    </div>,
    document.getElementById("modal")
  )
}

export default Modal
