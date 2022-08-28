export const createUser = async user => {
  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    return {
      success: res.ok,
      aborted: false,
    }
  } catch (err) {
    const isAborted = err.name === "AbortError"

    return {
      success: false,
      aborted: isAborted,
    }
  }
}
