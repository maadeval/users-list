import { useEffect } from "react"
import { createPortal } from "react-dom"
import ButtonIcon from "../ButtonIcon/ButtonIcon"
import CrossIcon from "../icons/CrossIcon/CrossIcon"
import style from "./Modal.module.css"

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    if (children) {
      document.body.classList.add(style.bodyOverflow)

      return () => document.body.classList.remove(style.bodyOverflow)
    }
  }, [children])

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
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  )
}

export default Modal
