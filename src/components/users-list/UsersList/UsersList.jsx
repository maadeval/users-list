import { useFilters } from "lib/hooks/useFilters"
import { useState } from "react"
import { UserFormsProvider } from "../../../lib/context/userFormsContext/UserFormsContext"
import { useUsers } from "../../../lib/hooks/useUser"
import UsersListViewSelector from "../../UsersListViewSelector/UsersListViewSelector"
import UsersFormContainer from "../UsersFormContainer/UsersFormContainer"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const [isView, setIsView] = useState(true)

  const { filters, filtersSetters, paginationSetters, resetFilters } =
    useFilters()

  const { users, usersError, usersLoading, totalUsers } = useUsers(filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UserFormsProvider resetFilters={resetFilters}>
        <UsersListFilters
          {...filtersSetters}
          active={filters.active}
          search={filters.search}
          sort={filters.sort}
        />
        <UsersFormContainer />
        <UsersListViewSelector isView={isView} setIsView={setIsView} />
        <UsersListRows
          error={usersError}
          loading={usersLoading}
          users={users}
          view={isView}
        />
      </UserFormsProvider>
      <UsersListPagination
        {...paginationSetters}
        page={filters.page}
        totalUsers={totalUsers}
        usersPerPage={filters.usersPerPage}
      />
    </section>
  )
}

export default UsersList
