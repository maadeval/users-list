import { useContext, useState } from "react"
import { ROLE_OPTIONS } from "../../../constants/sortUsersSelect"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { useCreateForm } from "../../../lib/hooks/useCreateForm"
import { createUser } from "../../../lib/services/createUsers"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputText from "../../forms/InputText/InputText"
import InputTextAsync from "../../forms/InputTextAsync/InputTextAsync"
import Select from "../../forms/Select/Select"

import style from "./UsersListCreateForm.module.css"

const UsersListCreateForm = () => {
  const { onSuccess } = useContext(UserFormsContext)

  const [isSubmiting, setIsSubmitting] = useState(false)

  const { name, username, dispatchFormValues, isFormInvalid } = useCreateForm()

  return (
    <form
      onSubmit={e =>
        handleSubmit(e, name, username, setIsSubmitting, onSuccess)
      }>
      <div className={style.formRow}>
        <InputText
          className={style.input}
          error={name.error}
          label="Nombre"
          onChange={e =>
            dispatchFormValues({ type: "name_changed", value: e.target.value })
          }
          value={name.value}
        />
        <InputTextAsync
          className={style.input}
          error={username.error}
          success={username.value && !username.error && !username.loading}
          loading={username.loading}
          label="Username"
          onChange={e =>
            dispatchFormValues({
              type: "username_changed",
              value: e.target.value,
            })
          }
          value={username.value}
        />
      </div>
      <div className={style.formRow}>
        <Select name="role">
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
      </div>
    </form>
  )
}

const handleSubmit = async (ev, name, username, setIsSubmitting, onSuccess) => {
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

  if (success) onSuccess()
  else setIsSubmitting(false)
}

export default UsersListCreateForm
