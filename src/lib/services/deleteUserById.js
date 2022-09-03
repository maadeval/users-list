export const deleteUserById = async userId => {
  try {
    const res = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return {
      success: res.ok,
    }
  } catch (err) {
    return {
      success: !!err,
    }
  }
}
