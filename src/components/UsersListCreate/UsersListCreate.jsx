import { ROLE_OPTIONS } from "../../constants/sort-users-select"
import { useFormValues } from "../../lib/hooks/useFormValues"
import InputCheckbox from "../forms/InputCheckbox/InputCheckbox"
import InputText from "../forms/InputText/InputText"
import InputTextAsync from "../forms/InputTextAsync/InputTextAsync"
import Select from "../forms/Select/Select"

const UsersListCreate = () => {
  const { name, username, setName, setUsername } = useFormValues()

  return (
    <form>
      <InputText
        placeholder="Nombre"
        value={name.value}
        error={name.error}
        onChange={ev => setName(ev.target.value)}
      />
      <InputTextAsync
        placeholder="Username"
        value={username.value}
        error={username.error}
        onChange={ev => setUsername(ev.target.value)}
      />
      <Select name="role" value={ROLE_OPTIONS.TEACHER}>
        <option value={ROLE_OPTIONS.TEACHER}>Profesor</option>
        <option value={ROLE_OPTIONS.STUDENT}>Alumno</option>
        <option value={ROLE_OPTIONS.OTHER}>Otro</option>
      </Select>
      <InputCheckbox id="active" name="active" />
      <label htmlFor="active">Activo?</label>
    </form>
  )
}

export default UsersListCreate
