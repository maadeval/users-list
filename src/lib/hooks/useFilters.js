import { useState } from "react"
import { PAGE_VALUES } from "../../constants/pageSelectors"
import { SORT_OPTIONS } from "../../constants/sortUsersSelect"

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    active: false,
    sort: SORT_OPTIONS.DEFAULT,
    page: PAGE_VALUES.PAGE,
    usersPerPage: PAGE_VALUES.USERS_PER_PAGE,
  })

  const setSearch = value => {
    setFilters({ ...filters, page: PAGE_VALUES.PAGE, search: value })
  }
  const setActive = value => {
    setFilters({ ...filters, page: PAGE_VALUES.PAGE, active: value })
  }

  const setSort = value => {
    setFilters({ ...filters, page: PAGE_VALUES.PAGE, sort: value })
  }

  const setPage = value => {
    setFilters({ ...filters, page: value })
  }

  const setUsersPerPage = value => {
    setFilters({ ...filters, page: PAGE_VALUES.PAGE, usersPerPage: value })
  }

  return {
    filters,
    setActive,
    setPage,
    setSearch,
    setSort,
    setUsersPerPage,
  }
}
