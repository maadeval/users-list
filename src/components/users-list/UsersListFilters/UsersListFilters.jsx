import { useState } from "react"
import {
  OPTIONS_SELECT,
  SORT_OPTIONS,
} from "../../../constants/sortUsersSelect"
import {
  activeChanged,
  searchChanged,
  sortByChanged,
} from "../../../lib/actions/filtersActions"
import Button from "../../Button/Button"
import InputCheckbox from "../../forms/InputCheckbox/InputCheckbox"
import InputSearch from "../../forms/InputSearch"
import Select from "../../forms/Select/Select"
import Modal from "../../Modal/Modal"
import UsersListCreateForm from "../UsersListCreateForm/UsersListCreateForm"

import style from "./UsersListFilters.module.css"

const UsersListFilters = ({ search, active, sort, dispatchFilters }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={style.wrapper}>
      <Modal closeModal={() => setShowModal(false)}>
        {showModal && (
          <UsersListCreateForm closeModal={() => setShowModal(false)} />
        )}
      </Modal>
      <div className={style.row}>
        <InputSearch
          placeholder="Buscar..."
          value={search}
          onChange={ev => dispatchFilters(searchChanged(ev.target.value))}
        />
        <Select
          value={sort}
          onChange={ev => dispatchFilters(sortByChanged(ev.target.value))}>
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
            onChange={e => dispatchFilters(activeChanged(e.target.checked))}
          />
          <label htmlFor="active-selector" className={style.label}>
            Mostrar solo activos
          </label>
        </div>
        <Button onClick={() => setShowModal(true)}>Agregar Usuario</Button>
      </div>
    </div>
  )
}

export default UsersListFilters
