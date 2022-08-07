import ButtonIcon from "../ButtonIcon"
import Select from "../forms/Select/Select"
import SearchIcon from "../icons/SearchIcon/SearchIcon"

import style from "./UsersListPagination.module.css"

const UsersListPagination = ({
  page,
  usersPerPage,
  setPage,
  setUsersPerPage,
}) => {
  return (
    <div className={style.wrapper}>
      <Select
        value={usersPerPage}
        onChange={e => setUsersPerPage(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </Select>
      <label>Elementos por pagina</label>
      <ButtonIcon variant="black" isFill icon={SearchIcon} />
    </div>
  )
}

export default UsersListPagination
