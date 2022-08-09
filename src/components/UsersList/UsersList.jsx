import { useFilters } from "lib/hooks/useFilters"
import { PAGE_VALUES } from "../../constants/page-selectors"
import {
  filterActiveUsers,
  filterUsersByName,
  paginationUsers,
  sortUsers,
} from "../../lib/users/filterUsers"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = ({ initialUsers }) => {
  const { filters, setActive, setPage, setSearch, setSort, setUsersPerPage } =
    useFilters()
  const { filteredUsers, totalPages } = getUsers(initialUsers, filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UsersListFilters
        search={filters.search}
        active={filters.active}
        sort={filters.sort}
        setSearch={setSearch}
        setActive={setActive}
        setSort={setSort}
      />
      <UsersListRows users={filteredUsers} />
      <UsersListPagination
        page={filters.page}
        usersPerPage={filters.usersPerPage}
        setPage={setPage}
        setUsersPerPage={setUsersPerPage}
        totalPages={totalPages}
      />
    </section>
  )
}

const getUsers = (
  initialUsers,
  {
    search,
    active,
    sort,
    page = PAGE_VALUES.PAGE,
    usersPerPage = PAGE_VALUES.USERS_PER_PAGE,
  }
) => {
  let filteredUsers = filterActiveUsers(initialUsers, active)
  filteredUsers = filterUsersByName(filteredUsers, search)
  filteredUsers = sortUsers(filteredUsers, sort)

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  filteredUsers = paginationUsers(filteredUsers, page, usersPerPage)

  return {
    filteredUsers,
    totalPages,
  }
}

export default UsersList
