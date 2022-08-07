import { ROLE_OPTIONS, SORT_OPTIONS } from "../../constants/sort-users-select"

export const filterActiveUsers = (users, activeStatus) => {
  if (!activeStatus) return [...users]

  return users.filter(user => user.active)
}

export const filterUsersByName = (users, searchValue) => {
  if (searchValue.trim() === "") return [...users]

  const searchValueLower = searchValue.toLowerCase()

  return users.filter(({ name }) => {
    const lowerName = name.toLowerCase()
    return lowerName.includes(searchValueLower)
  })
}

export const sortUsers = (users, sortValue) => {
  const normalizedUsers = [...users]

  switch (sortValue) {
    case SORT_OPTIONS.DEFAULT:
      return [...users]
    case SORT_OPTIONS.NAME:
      return normalizedUsers.sort((a, b) => a.name.localeCompare(b.name))
    case SORT_OPTIONS.ROLE:
      return normalizedUsers.sort((a, b) => {
        if (a.role === b.role) return 0
        if (a.role === ROLE_OPTIONS.TEACHER) return -1
        if (a.role === ROLE_OPTIONS.STUDENT && b.role === ROLE_OPTIONS.OTHER)
          return -1
        return 1
      })
    case SORT_OPTIONS.ACTIVE:
      return normalizedUsers.sort((a, b) => {
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        return 0
      })
    default:
      return [...users]
  }
}
