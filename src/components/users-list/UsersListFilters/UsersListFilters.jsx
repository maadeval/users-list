import { useContext } from "react"
import {
  OPTIONS_SELECT,
  SORT_OPTIONS,
} from "../../../constants/sortUsersSelect"
import { USERS_FORM_PANELS } from "../../../constants/usersFormsPanels"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputSearch from "../../forms/InputSearch"
import Select from "../../forms/Select/Select"

import style from "./UsersListFilters.module.css"

const UsersListFilters = ({ search, active, sort, dispatchFilters }) => {
  const { setCreatePanel, currentFormPanel } = useContext(UserFormsContext)

  if (currentFormPanel !== USERS_FORM_PANELS.FILTERS) return null

  return (
    <div className={style.wrapper}>
      <div className={style.row}>
        <InputSearch
          placeholder="Buscar..."
          value={search}
          onChange={e =>
            dispatchFilters({ type: "search_changed", value: e.target.value })
          }
        />
        <Select
          value={sort}
          onChange={e =>
            dispatchFilters({
              type: "sort_changed",
              value: Number(e.target.value),
            })
          }>
          {OPTIONS_SELECT.map(option => {
            const hasActiveByFilterAndBySort =
              active && option.value === SORT_OPTIONS.ACTIVE
            if (hasActiveByFilterAndBySort) return null
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </Select>
      </div>
      <div className={style.row}>
        <div className={style.checkboxWrapper}>
          <InputCheckbox
            type="checkbox"
            id="active-selector"
            value={active}
            onChange={e =>
              dispatchFilters({
                type: "active_changed",
                value: e.target.checked,
              })
            }
          />
          <label htmlFor="active-selector" className={style.label}>
            Mostrar solo activos
          </label>
        </div>
        <Button onClick={setCreatePanel}>Agregar Usuario</Button>
      </div>
    </div>
  )
}

export default UsersListFilters
