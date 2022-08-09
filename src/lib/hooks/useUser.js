import { useEffect, useState } from "react"
import { getUsers } from "../services/getUsers"
import { usersToDisplay } from "../users/filterUsers"

export const useUsers = filters => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getUsers().then(setUsers, controller.signal)

    return () => controller.abort()
  }, [])

  const { filteredUsers, totalPages } = usersToDisplay(users, filters)

  return {
    filteredUsers,
    totalPages,
  }
}
