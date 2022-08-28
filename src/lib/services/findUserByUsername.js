export const findUserByUsername = async (username, signal) => {
  let user

  try {
    const res = await fetch(
      `http://localhost:4000/users?username=${username}`,
      { signal }
    )

    if (res.ok) {
      const users = await res.json()
      user = users[0]
    }

    return {
      user,
      error: !res.ok,
      aborted: false,
    }
  } catch (err) {
    const isAborted = err.name === "AbortError"

    return {
      user,
      error: !isAborted,
      aborted: isAborted,
    }
  }
}
