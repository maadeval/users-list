import { useFilters } from "lib/hooks/useFilters"
import { UserFormsProvider } from "../../../lib/context/userFormsContext/UserFormsContext"
import { useUsers } from "../../../lib/hooks/useUser"
import { usersToDisplay } from "../../../lib/users/filterUsers"
import UsersFormContainer from "../UsersFormContainer/UsersFormContainer"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const {
    filters,
    pagination,
    filtersSetters,
    paginationSetters,
    resetFilters,
  } = useFilters()

  const { users, usersError, usersLoading, reloadUsers } = useUsers()

  const { filteredUsers, totalPages } = usersToDisplay(
    users,
    filters,
    pagination
  )

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      <UserFormsProvider resetFilters={resetFilters} reloadUsers={reloadUsers}>
        <UsersListFilters {...filters} {...filtersSetters} />
        <UsersFormContainer />
        <UsersListRows
          users={filteredUsers}
          error={usersError}
          loading={usersLoading}
        />
      </UserFormsProvider>
      <UsersListPagination
        {...pagination}
        {...paginationSetters}
        totalPages={totalPages}
      />
    </section>
  )
}

export default UsersList
