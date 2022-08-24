import UserRow from "../UserRow"

import style from "./UsersListRows.module.css"

const UsersListRows = ({ users, error, loading }) => {
  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>
  if (users.length === 0) return <p>No hay resultados en la busqueda</p>

  return (
    <section className={style.wrapper}>
      {users.map(user => (
        <UserRow key={user.id} {...user} />
      ))}
    </section>
  )
}

export default UsersListRows
