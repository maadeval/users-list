import { OPTIONS_SELECT, SORT_OPTIONS } from "../../constants/sort-users-select"
import InputCheckbox from "../forms/InputCheckbox/InputCheckbox"
import InputSearch from "../forms/InputSearch"
import Select from "../forms/Select/Select"

import style from "./UsersListFilters.module.css"

const UsersListFilters = ({
  search,
  setSearch,
  active,
  setActive,
  sort,
  setSort,
  slot,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.row}>
        <InputSearch
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select value={sort} onChange={e => setSort(e.target.value)}>
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
            onChange={e => setActive(e.target.checked)}
          />
          <label htmlFor="active-selector" className={style.label}>
            Mostrar solo activos
          </label>
        </div>
        {slot}
      </div>
    </div>
  )
}

export default UsersListFilters
