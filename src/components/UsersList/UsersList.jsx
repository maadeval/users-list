import { useFilters } from "lib/hooks/useFilters"
import { useUsers } from "../../lib/hooks/useUser"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const { filters, setActive, setPage, setSearch, setSort, setUsersPerPage } =
    useFilters()
  const { filteredUsers, totalPages, error, loading } = useUsers(filters)

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
      <UsersListRows users={filteredUsers} error={error} loading={loading} />
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

export default UsersList
