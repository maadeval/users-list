import UserRow from "../UserRow"

import style from "./UsersListRows.module.css"

const UsersListRows = ({ users, error, loading }) => {
  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al encontrar los usuarios</p>
  if (users.length === 0) return <p>No hay resultados en la busqueda</p>

  return (
    <section className={style.wrapper}>
      {users.map(user => (
        <UserRow {...user} key={user.id} />
      ))}
    </section>
  )
}

export default UsersListRows
