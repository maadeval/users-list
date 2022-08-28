export const getUsers = async signal => {
  let users

  try {
    const res = await fetch("http://localhost:4000/users", { signal })

    if (res.ok) users = await res.json()

    return {
      users,
      error: !users,
      aborted: false,
    }
  } catch (err) {
    const isAborted = err.name === "AbortError"

    return {
      users,
      error: !isAborted,
      aborted: isAborted,
    }
  }
}
