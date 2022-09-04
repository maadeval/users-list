import GridViewIcon from "../icons/GridViewIcon/GridViewIcon"
import ListViewIcon from "../icons/ListViewIcon/ListViewIcon"

import style from "./UsersListViewSelector.module.css"

const UsersListViewSelector = ({ isView, setIsView }) => {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        disabled={isView}
        onClick={() => setIsView(true)}>
        <GridViewIcon className={style.icon} />
      </button>
      <div className={style.divider} />
      <button
        className={style.button}
        disabled={!isView}
        onClick={() => setIsView(false)}>
        <ListViewIcon className={style.icon} />
      </button>
    </div>
  )
}

export default UsersListViewSelector
