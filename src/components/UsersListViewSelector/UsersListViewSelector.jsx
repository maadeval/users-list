import GridViewIcon from "../icons/GridViewIcon/GridViewIcon"
import ListViewIcon from "../icons/ListViewIcon/ListViewIcon"

import style from "./UsersListViewSelector.module.css"

const UsersListViewSelector = ({ isCardView, setIsCardView }) => {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        disabled={isCardView}
        onClick={() => setIsCardView(true)}>
        <GridViewIcon className={style.icon} />
      </button>
      <div className={style.divider} />
      <button
        className={style.button}
        disabled={!isCardView}
        onClick={() => setIsCardView(false)}>
        <ListViewIcon className={style.icon} />
      </button>
    </div>
  )
}

export default UsersListViewSelector
