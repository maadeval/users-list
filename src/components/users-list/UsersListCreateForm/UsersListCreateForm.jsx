import { useContext, useState } from "react"
import { ROLE_OPTIONS } from "../../../constants/sortUsersSelect"
import {
  formValuesNameChanged,
  formValuesUsernameChanged,
} from "../../../lib/actions/formValuesActions"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { alertBox } from "../../../lib/events/alertEvents"
import { useCreateForm } from "../../../lib/hooks/useCreateForm"
import { createUser } from "../../../lib/services/createUsers"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputText from "../../forms/InputText/InputText"
import InputTextAsync from "../../forms/InputTextAsync/InputTextAsync"
import Select from "../../forms/Select/Select"

import style from "./UsersListCreateForm.module.css"

const UsersListCreateForm = ({ closeModal }) => {
  const { onSuccess } = useContext(UserFormsContext)

  const [isSubmiting, setIsSubmitting] = useState(false)

  const { name, username, dispatchFormValues, isFormInvalid } = useCreateForm()

  return (
    <form
      className={style.form}
      onSubmit={e =>
        handleSubmit(e, name, username, setIsSubmitting, onSuccess, closeModal)
      }>
      <InputText
        error={name.error}
        label="Nombre"
        onChange={ev =>
          dispatchFormValues(formValuesNameChanged(ev.target.value))
        }
        value={name.value}
      />
      <InputTextAsync
        error={username.error}
        success={username.value && !username.error && !username.loading}
        loading={username.loading}
        label="Username"
        onChange={ev =>
          dispatchFormValues(formValuesUsernameChanged(ev.target.value))
        }
        value={username.value}
      />
      <Select name="role" className={style.select}>
        <option value={ROLE_OPTIONS.TEACHER}>Profesor</option>
        <option value={ROLE_OPTIONS.STUDENT}>Alumno</option>
        <option value={ROLE_OPTIONS.OTHER}>Otro</option>
      </Select>
      <label className={style.checkbox}>
        <InputCheckbox name="active" />
        <span>Activo?</span>
      </label>
      <Button disabled={isFormInvalid || isSubmiting} type="submit">
        {isSubmiting ? "Creando..." : "Crear usuario"}
      </Button>
    </form>
  )
}

const handleSubmit = async (
  ev,
  name,
  username,
  setIsSubmitting,
  onSuccess,
  closeModal
) => {
  ev.preventDefault()

  setIsSubmitting(true)

  const newUser = {
    id: crypto.randomUUID(),
    name: name.value,
    username: username.value,
    active: ev.target.active.checked,
    role: ev.target.role.value,
  }

  const { success, aborted } = await createUser(newUser)

  if (aborted) return

  if (!success) {
    setIsSubmitting(false)
    alertBox.error("Error al crear el usuario")
  } else {
    alertBox.success("Usuario creado correctamente")
    onSuccess()
  }

  closeModal()
}

export default UsersListCreateForm
