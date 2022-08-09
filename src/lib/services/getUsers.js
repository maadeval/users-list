export const getUsers = async signal => {
  try {
    const res = await fetch("http://localhost:4000/users", { signal })
    if (res.ok) {
      const data = await res.json()
      return data
    }
  } catch (e) {
    console.log(e)
    return []
  }
}
