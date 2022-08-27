import { useState } from "react"
import { ROLE_OPTIONS } from "../../constants/sortUsersSelect"
import { useFormValues } from "../../lib/hooks/useFormValues"
import Button from "../Button/Button"
import ButtonIcon from "../ButtonIcon/ButtonIcon"
import InputCheckbox from "../forms/InputCheckbox/InputCheckbox"
import InputText from "../forms/InputText/InputText"
import InputTextAsync from "../forms/InputTextAsync/InputTextAsync"
import Select from "../forms/Select/Select"
import CrossIcon from "../icons/CrossIcon/CrossIcon"

import style from "./UsersListCreateForm.module.css"

const UsersListCreateForm = ({ onClose }) => {
  const [isSubmiting, setIsSubmitting] = useState(false)
  const { name, username, setName, setUsername } = useFormValues()

  const isDisabled =
    !name.value ||
    !username.value ||
    name.error ||
    username.error ||
    username.loading ||
    isSubmiting

  return (
    <div className={style.wrapper}>
      <form
        onSubmit={e =>
          handleSubmit(e, name, username, setIsSubmitting, onClose)
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
            success={username.value && !username.error && !username.loading}
            loading={username.loading}
            label="Username"
            onChange={e => setUsername(e.target.value)}
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
          <Button disabled={isDisabled} type="submit">
            {isSubmiting ? "Creando..." : "Crear usuario"}
          </Button>
        </div>
      </form>
      <ButtonIcon
        className={style.close}
        icon={CrossIcon}
        isFill
        onClick={onClose}
      />
    </div>
  )
}

const handleSubmit = async (ev, name, username, setIsSubmitting, onClose) => {
  ev.preventDefault()

  setIsSubmitting(true)

  const newUser = {
    id: crypto.randomUUID(),
    name: name.value,
    username: username.value,
    active: ev.target.active.checked,
    role: ev.target.role.value,
  }

  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

    if (res.ok) return onClose()

    setIsSubmitting(false)
  } catch (err) {
    console.error(err)
  }
}

export default UsersListCreateForm
