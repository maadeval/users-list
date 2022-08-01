import { OPTIONS_SELECT } from "../../constants/sort-users-select"

const UsersListFilters = ({
  search,
  setSearch,
  active,
  setActive,
  sort,
  setSort,
}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Buscar usuario"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <label htmlFor="active-selector">Solo activos</label>
      <input
        type="checkbox"
        id="active-selector"
        value={active}
        onChange={e => setActive(e.target.checked)}
      />
      <select value={sort} onChange={e => setSort(e.target.value)}>
        {OPTIONS_SELECT.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  )
}

export default UsersListFilters
