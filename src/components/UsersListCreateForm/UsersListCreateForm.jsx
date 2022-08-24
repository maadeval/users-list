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
  const { name, username, setName, setUsername } = useFormValues()

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <form className={style.form} onSubmit={onSubmit}>
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
        <Button type="submit">Editar usuario</Button>
      </div>
      <ButtonIcon
        className={style.close}
        icon={CrossIcon}
        isFill
        onClick={onClose}
      />
    </form>
  )
}

export default UsersListCreateForm
