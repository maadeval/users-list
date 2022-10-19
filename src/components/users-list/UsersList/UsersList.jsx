import { useReducer, useState } from "react"
import { resetChanged } from "../../../lib/actions/filtersActions"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import { useUsers } from "../../../lib/hooks/useUser"
import {
  filtersReducer,
  FILTERS_INITIAL_STATE,
} from "../../../lib/reducers/filtersReducer"
import UsersListViewSelector from "../../UsersListViewSelector/UsersListViewSelector"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const [isCardView, setIsCardView] = useState(true)

  const [filters, dispatchFilters] = useReducer(
    filtersReducer,
    FILTERS_INITIAL_STATE
  )

  const { users, usersError, usersLoading, totalUsers } = useUsers(filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UserFormsContext.Provider
        value={{ onSuccess: () => dispatchFilters(resetChanged()) }}>
        <UsersListFilters
          dispatchFilters={dispatchFilters}
          active={filters.active}
          search={filters.search}
          sort={filters.sort}
        />
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
      </UserFormsContext.Provider>
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
