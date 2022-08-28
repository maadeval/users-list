import { ROLE_OPTIONS } from "../../constants/sort-users-select"
import { useCreateForm } from "../../lib/hooks/useCreateForm"
import Button from "../Button/Button"
import ButtonIcon from "../ButtonIcon/ButtonIcon"
import InputCheckbox from "../forms/InputCheckbox/InputCheckbox"
import InputText from "../forms/InputText/InputText"
import InputTextAsync from "../forms/InputTextAsync/InputTextAsync"
import Select from "../forms/Select/Select"
import CrossCircleIcon from "../icons/CrossCircleIcon"

import style from "./UsersListCreate.module.css"

const UsersListCreate = ({ onClose }) => {
  const { name, username, setName, setUsername } = useCreateForm()

  return (
    <form className={style.form}>
      <div className={style.row}>
        <InputText
          label="Nombre"
          placeholder="Nombre"
          value={name.value}
          error={name.error}
          onChange={ev => setName(ev.target.value)}
        />
        <InputTextAsync
          label="Username"
          placeholder="Username"
          value={username.value}
          error={username.error}
          onChange={ev => setUsername(ev.target.value)}
        />
      </div>
      <div className={style.row}>
        <Select name="role" value={ROLE_OPTIONS.TEACHER}>
          <option value={ROLE_OPTIONS.TEACHER}>Profesor</option>
          <option value={ROLE_OPTIONS.STUDENT}>Alumno</option>
          <option value={ROLE_OPTIONS.OTHER}>Otro</option>
        </Select>
        <label className={style.checkbox}>
          <InputCheckbox name="active" />
          <span>Activo?</span>
        </label>
        <Button type="submit">Agregar usuario</Button>
      </div>
      <ButtonIcon
        type="button"
        className={style.cancelButton}
        isFill
        onClick={onClose}
        icon={CrossCircleIcon}
      />
    </form>
  )
}

export default UsersListCreate
