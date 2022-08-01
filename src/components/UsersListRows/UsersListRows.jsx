import UserRow from "../UserRow"

const UsersListRows = ({ users }) => {
  if (users.length === 0) return <p>No hay resultados en la busqueda</p>

  return (
    <>
      {users.map(user => (
        <UserRow key={user.username} {...user} />
      ))}
    </>
  )
}

export default UsersListRows
