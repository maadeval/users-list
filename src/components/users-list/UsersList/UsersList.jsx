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
  const [isCardView, setIsCardView] = useState(true)

  const { filters, dispatchFilters } = useFilters()

  const { users, usersError, usersLoading, totalUsers } = useUsers(filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UserFormsProvider dispatchFilters={dispatchFilters}>
        <UsersListFilters
          dispatchFilters={dispatchFilters}
          active={filters.active}
          search={filters.search}
          sort={filters.sort}
        />
        <UsersFormContainer />
        <UsersListViewSelector
          isCardView={isCardView}
          setIsCardView={setIsCardView}
        />
        <UsersListRows
          error={usersError}
          loading={usersLoading}
          users={users}
          isCardView={isCardView}
        />
      </UserFormsProvider>
      <UsersListPagination
        dispatchFilters={dispatchFilters}
        page={filters.page}
        totalUsers={totalUsers}
        usersPerPage={filters.usersPerPage}
      />
    </section>
  )
}

export default UsersList
