import { useContext, useState } from "react"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { alertBox } from "../../../lib/events/alertEvents"
import { deleteUserById } from "../../../lib/services/deleteUserById"
import Button from "../../Button/Button"

import style from "./UsersListDeleteForm.module.css"

const UsersListDeleteForm = ({ currentUser, closeModal }) => {
  const { onSuccess } = useContext(UserFormsContext)
  const [isSubmiting, setIsSubmitting] = useState(false)

  return (
    <form
      onSubmit={e =>
        handleSubmit(e, currentUser.id, setIsSubmitting, onSuccess, closeModal)
      }>
      <div className={style.formRow}>
        <p>
          Segro quieres eliminar al usuario {'"'}
          {currentUser.name}
          {'"'}?
        </p>
      </div>
      <div className={style.formRow}>
        <Button
          variant={"secondary"}
          disabled={isSubmiting}
          type="button"
          onClick={closeModal}>
          Cancelar
        </Button>
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? "Cargando..." : "Eliminar usuario"}
        </Button>
      </div>
    </form>
  )
}

const handleSubmit = async (
  ev,
  userId,
  setIsSubmitting,
  onSuccess,
  closeModal
) => {
  ev.preventDefault()

  setIsSubmitting(true)

  const { success } = await deleteUserById(userId)

  if (!success) {
    setIsSubmitting(false)
    alertBox.error("No se pudo eliminar el usuario")
  } else {
    onSuccess()
    alertBox.success("Usuario eliminado")
  }

  closeModal()
}

export default UsersListDeleteForm
