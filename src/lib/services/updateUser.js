export const updateUser = async user => {
  try {
    const res = await fetch(`http://localhost:4000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    return {
      success: res.ok,
    }
  } catch (err) {
    return {
      success: !err,
    }
  }
}
