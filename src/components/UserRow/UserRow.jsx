import UserRole from "../UserRole"

const UserRow = ({ username, role, active }) => {
  return (
    <article
      key={username}
      style={{ display: "flex", gap: "4rem", alignItems: "center" }}>
      <p>{username}</p>
      <UserRole role={role} />
      <span>{active ? "Activo" : "Inactivo"}</span>
    </article>
  )
}

export default UserRow
