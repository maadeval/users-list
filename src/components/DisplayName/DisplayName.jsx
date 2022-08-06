import style from "./DisplayName.module.css"

const DisplayName = ({ name, username, avatar }) => {
  return (
    <div className={style.container}>
      {avatar && <img src={avatar} alt={name} />}
      <div>
        <p className={style.name}>{name}</p>
        <p className={style.username}>@{username}</p>
      </div>
    </div>
  )
}

export default DisplayName
