import { OPTIONS_SELECT } from "constants/sort-users-select"
import { useState } from "react"

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    active: false,
    sort: OPTIONS_SELECT[0].value,
  })

  const { search, active, sort } = filters

  const setSearch = value => setFilters({ ...filters, search: value })
  const setActive = value => setFilters({ ...filters, active: value })
  const setSort = value => setFilters({ ...filters, sort: value })

  return { search, active, sort, setSearch, setActive, setSort }
}
