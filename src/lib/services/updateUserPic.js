export const updateUserPic = async (userId, picture) => {
  try {
    const res = await fetch(`http://localhost:4000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ picture }),
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
