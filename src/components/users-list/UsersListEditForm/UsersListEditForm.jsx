import { useState } from "react"
import { ROLE_OPTIONS } from "../../../constants/sortUsersSelect"
import { useEditForm } from "../../../lib/hooks/useEditForm"
import { updateUser } from "../../../lib/services/updateUser"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputText from "../../forms/InputText/InputText"
import InputTextAsync from "../../forms/InputTextAsync/InputTextAsync"
import Select from "../../forms/Select/Select"

import style from "./UsersListEditForm.module.css"

const UsersListEditForm = ({ onSuccess, user }) => {
  const [isSubmiting, setIsSubmitting] = useState(false)
  const {
    active,
    isFormInvalid,
    name,
    role,
    setActive,
    setName,
    setRole,
    setUsername,
    username,
  } = useEditForm(user)

  return (
    <form
      onSubmit={e =>
        handleSubmit(
          e,
          {
            id: user.id,
            name: name.value,
            username: username.value,
            active,
            role,
          },
          setIsSubmitting,
          onSuccess
        )
      }>
      <div className={style.formRow}>
        <InputText
          className={style.input}
          error={name.error}
          label="Nombre"
          onChange={e => setName(e.target.value)}
          value={name.value}
        />
        <InputTextAsync
          className={style.input}
          error={username.error}
          success={
            !username.error &&
            !username.loading &&
            user.username !== username.value
          }
          loading={username.loading}
          label="Username"
          onChange={e => setUsername(e.target.value)}
          value={username.value}
        />
      </div>
      <div className={style.formRow}>
        <Select
          value={role}
          onChange={ev => setRole(ev.target.value)}
          name="role">
          <option value={ROLE_OPTIONS.TEACHER}>Profesor</option>
          <option value={ROLE_OPTIONS.STUDENT}>Alumno</option>
          <option value={ROLE_OPTIONS.OTHER}>Otro</option>
        </Select>
        <label className={style.checkbox}>
          <InputCheckbox
            checked={active}
            onChange={ev => setActive(ev.target.checked)}
            name="active"
          />
          <span>Activo?</span>
        </label>
        <Button disabled={isFormInvalid || isSubmiting} type="submit">
          {isSubmiting ? "Creando..." : "Editar usuario"}
        </Button>
      </div>
    </form>
  )
}

const handleSubmit = async (ev, user, setIsSubmitting, onSuccess) => {
  ev.preventDefault()

  setIsSubmitting(true)

  const { success } = await updateUser(user)

  if (success) onSuccess()
  else setIsSubmitting(false)
}

export default UsersListEditForm
