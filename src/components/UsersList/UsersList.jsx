import { useFilters } from "lib/hooks/useFilters"
import { useState } from "react"
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
  const [page, setPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(3)
  const { search, active, sort, ...setFiltersFunctions } = useFilters()
  const filteredUsers = getUsers(initialUsers, {
    search,
    active,
    sort,
    page,
    usersPerPage,
  })

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UsersListFilters
        search={search}
        active={active}
        sort={sort}
        {...setFiltersFunctions}
      />
      <UsersListRows users={filteredUsers} />
      <UsersListPagination
        page={page}
        usersPerPage={usersPerPage}
        setPage={setPage}
        setUsersPerPage={setUsersPerPage}
      />
    </section>
  )
}

const getUsers = (
  initialUsers,
  { search, active, sort, page = 1, usersPerPage = 3 }
) => {
  let filteredUsers = filterActiveUsers(initialUsers, active)
  filteredUsers = filterUsersByName(filteredUsers, search)
  filteredUsers = sortUsers(filteredUsers, sort)
  filteredUsers = paginationUsers(filteredUsers, page, usersPerPage)

  return filteredUsers
}

export default UsersList
