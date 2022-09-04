import { useEffect, useState } from "react"
import { getUsers } from "../services/getUsers"

export const useUsers = filters => {
  const [users, setUsers] = useState({
    data: [],
    count: 0,
    loading: true,
    error: false,
  })

  const setData = (data, count) =>
    setUsers({
      data,
      count,
      loading: false,
      error: false,
    })

  const setError = () =>
    setUsers({
      data: [],
      count: 0,
      loading: false,
      error: true,
    })

  useEffect(() => {
    const controller = new AbortController()

    loadUsers(setData, setError, controller.signal, filters)

    return () => controller.abort()
  }, [filters])

  return {
    users: users.data,
    totalUsers: users.count,
    usersError: users.error,
    usersLoading: users.loading,
  }
}

const loadUsers = async (setData, setError, signal, { page, usersPerPage }) => {
  const { users, aborted, count } = await getUsers(signal, {
    page,
    usersPerPage,
  })

  if (aborted) return
  if (users) setData(users, count)
  else setError()
}
