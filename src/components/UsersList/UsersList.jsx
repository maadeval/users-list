import { useFilters } from "lib/hooks/useFilters"
import {
  filterActiveUsers,
  filterUsersByName,
  sortUsers,
} from "../../lib/users/filterUsers"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = ({ initialUsers }) => {
  const { search, active, sort, ...setFiltersFunctions } = useFilters()

  let filteredUsers = filterActiveUsers(initialUsers, active)
  filteredUsers = filterUsersByName(filteredUsers, search)
  filteredUsers = sortUsers(filteredUsers, sort)

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
    </section>
  )
}

export default UsersList
