import UserRow from "../UserRow"

const UsersListRows = ({ users, error, loading }) => {
  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>
  if (users.length === 0) return <p>No hay resultados en la busqueda</p>

  return (
    <>
      {users.map(user => (
        <UserRow key={user.id} {...user} />
      ))}
    </>
  )
}

export default UsersListRows
