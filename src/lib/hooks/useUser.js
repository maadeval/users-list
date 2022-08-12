import { useEffect, useState } from "react"
import { getUsers } from "../services/getUsers"
import { usersToDisplay } from "../users/filterUsers"

export const useUsers = filters => {
  const [users, setUsers] = useState({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    getUsers(controller.signal)
      .then(data => setUsers(lastState => ({ ...lastState, data })))
      .catch(e =>
        setUsers(lastState => ({
          ...lastState,
          error: "Error al recuperar los usuarios",
        }))
      )
      .finally(() =>
        setUsers(lastValues => ({ ...lastValues, loading: false }))
      )

    return () => controller.abort()
  }, [])

  const { filteredUsers, totalPages } = usersToDisplay(users.data, filters)

  return {
    filteredUsers,
    totalPages,
    error: users.error,
    loading: users.loading,
  }
}
