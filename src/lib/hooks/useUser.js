import { useEffect, useState } from "react"
import { getUsers } from "../services/getUsers"

export const useUsers = () => {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    error: false,
  })

  const setData = data =>
    setUsers({
      data,
      loading: false,
      error: false,
    })

  const setError = () =>
    setUsers({
      data: [],
      loading: false,
      error: true,
    })

  useEffect(() => {
    const controller = new AbortController()

    loadUsers(setData, setError, controller.signal)

    return () => controller.abort()
  }, [])

  return {
    users: users.data,
    error: users.error,
    loading: users.loading,
  }
}

const loadUsers = async (setData, setError, signal) => {
  const { users, aborted } = await getUsers(signal)

  if (aborted) return
  if (users) setData(users)
  else setError()
}
