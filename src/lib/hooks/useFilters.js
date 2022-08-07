import { useState } from "react"
import { SORT_OPTIONS } from "../../constants/sort-users-select"

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    active: false,
    sort: SORT_OPTIONS.DEFAULT,
  })

  const { search, active, sort } = filters

  const setSearch = value => setFilters({ ...filters, search: value })
  const setActive = value => setFilters({ ...filters, active: value })
  const setSort = value => setFilters({ ...filters, sort: value })

  return { search, active, sort, setSearch, setActive, setSort }
}
