import { SORT_OPTIONS } from "../../constants/sortUsersSelect"

export const getUsers = async (signal, filters) => {
  let users

  const url = getUsersURL(filters)

  try {
    const res = await fetch(url, { signal })

    if (res.ok) users = await res.json()

    return {
      users,
      count: res.ok ? res.headers.get("x-total-count") : 0,
      error: !users,
      aborted: false,
    }
  } catch (err) {
    const isAborted = err.name === "AbortError"

    return {
      users,
      count: 0,
      error: !isAborted,
      aborted: isAborted,
    }
  }
}

const SORT_MAPPER = {
  [SORT_OPTIONS.NAME]: ["name", "asc"],
  [SORT_OPTIONS.ROLE]: ["role", "desc"],
  [SORT_OPTIONS.ACTIVE]: ["active", "desc"],
}

const getUsersURL = ({ page, usersPerPage, sort, active, search }) => {
  const url = new URL("http://localhost:4000/users")

  url.searchParams.append("_page", page)
  url.searchParams.append("_limit", usersPerPage)

  if (search) url.searchParams.append("name_like", search)
  if (active) url.searchParams.append("active", true)

  const [_sort, _order] = SORT_MAPPER[sort]

  if (_sort) {
    url.searchParams.append("_sort", _sort)
    url.searchParams.append("_order", _order)
  }

  return url.href
}
