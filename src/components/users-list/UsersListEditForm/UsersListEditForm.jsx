import { useContext, useState } from "react"
import { ROLE_OPTIONS } from "../../../constants/sortUsersSelect"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { useEditForm } from "../../../lib/hooks/useEditForm"
import { updateUser } from "../../../lib/services/updateUser"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputText from "../../forms/InputText/InputText"
import InputTextAsync from "../../forms/InputTextAsync/InputTextAsync"
import Select from "../../forms/Select/Select"

import style from "./UsersListEditForm.module.css"

const UsersListEditForm = () => {
  const { onSuccess, currentUser } = useContext(UserFormsContext)

  const [isSubmiting, setIsSubmitting] = useState(false)

  const { active, isFormInvalid, name, role, dispatchFormValues, username } =
    useEditForm(currentUser)

  return (
    <form
      onSubmit={e =>
        handleSubmit(
          e,
          {
            id: currentUser.id,
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
          onChange={e =>
            dispatchFormValues({ type: "name_changed", value: e.target.value })
          }
          value={name.value}
        />
        <InputTextAsync
          className={style.input}
          error={username.error}
          success={
            !username.error &&
            !username.loading &&
            currentUser.username !== username.value
          }
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
        <Select
          value={role}
          onChange={ev =>
            dispatchFormValues({ type: "role_changed", value: ev.target.value })
          }
          name="role">
          <option value={ROLE_OPTIONS.TEACHER}>Profesor</option>
          <option value={ROLE_OPTIONS.STUDENT}>Alumno</option>
          <option value={ROLE_OPTIONS.OTHER}>Otro</option>
        </Select>
        <label className={style.checkbox}>
          <InputCheckbox
            checked={active}
            onChange={ev =>
              dispatchFormValues({
                type: "active_changed",
                value: ev.target.checked,
              })
            }
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
