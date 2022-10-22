import style from "./DisplayName.module.css"

const DisplayName = ({ name, username, picture }) => {
  return (
    <div className={style.container}>
      <img
        className={style.picture}
        src={picture || "/user-pic.svg"}
        alt={`Imagen de ${name}`}
      />
      <div className={style.display}>
        <p className={style.name}>{name}</p>
        <p className={style.username}>@{username}</p>
      </div>
    </div>
  )
}

export default DisplayName
