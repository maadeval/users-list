import { OPTIONS_SELECT } from "constants/sort-users-select"
import { useFilters } from "lib/hooks/useFilters"
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
      <h1>Lista de usuarios</h1>
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

const filterActiveUsers = (users, activeStatus) => {
  if (!activeStatus) return [...users]

  return users.filter(user => user.active)
}

const filterUsersByName = (users, searchValue) => {
  if (searchValue.trim() === "") return [...users]

  const searchValueLower = searchValue.toLowerCase()

  return users.filter(({ name }) => {
    const lowerName = name.toLowerCase()
    return lowerName.includes(searchValueLower)
  })
}

const sortUsers = (users, sortValue) => {
  const normalizedUsers = [...users]

  switch (sortValue) {
    case OPTIONS_SELECT[0].value:
      return [...users]
    case OPTIONS_SELECT[1].value:
      return normalizedUsers.sort((a, b) => a.name.localeCompare(b.name))
    case OPTIONS_SELECT[2].value:
      return normalizedUsers.sort((a, b) => {
        if (a.role === b.role) return 0
        if (a.role === "teacher") return -1
        if (a.role === "student" && b.role === "other") return -1
        return 1
      })
    case OPTIONS_SELECT[3].value:
      return normalizedUsers.sort((a, b) => {
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        return 0
      })
    default:
      return [...users]
  }
}

export default UsersList
