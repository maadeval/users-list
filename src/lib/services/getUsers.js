export const getUsers = async (signal, { page = 0, usersPerPage = 8 }) => {
  let users

  try {
    const res = await fetch(
      `http://localhost:4000/users?_page=${page}&_limit=${usersPerPage}`,
      { signal }
    )

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
