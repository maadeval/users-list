import { useContext, useState } from "react"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { deleteUserById } from "../../../lib/services/deleteUserById"
import Button from "../../Button/Button"

import style from "./UsersListDeleteForm.module.css"

const UsersListDeleteForm = () => {
  const { onSuccess, setFiltersPanel, currentUser } =
    useContext(UserFormsContext)

  const [isSubmiting, setIsSubmitting] = useState(false)

  return (
    <form
      onSubmit={e =>
        handleSubmit(e, currentUser.id, setIsSubmitting, onSuccess)
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
          onClick={setFiltersPanel}>
          Cancelar
        </Button>
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? "Cargando..." : "Eliminar usuario"}
        </Button>
      </div>
    </form>
  )
}

const handleSubmit = async (ev, userId, setIsSubmitting, onSuccess) => {
  ev.preventDefault()

  setIsSubmitting(true)

  const { success } = await deleteUserById(userId)

  if (success) onSuccess()
  else setIsSubmitting(false)
}

export default UsersListDeleteForm
