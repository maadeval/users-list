import Select from "../../forms/Select/Select"
import PageSelector from "../../PageSelector/PageSelector"

import style from "./UsersListPagination.module.css"

const UsersListPagination = ({
  page,
  usersPerPage,
  setPage,
  setUsersPerPage,
  totalUsers,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.selectorPage}>
        <Select
          value={usersPerPage}
          onChange={e => setUsersPerPage(Number(e.target.value))}>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </Select>
        <label>Elementos por pagina</label>
      </div>
      <PageSelector
        currentPage={page}
        setPage={setPage}
        totalPages={Math.ceil(totalUsers / usersPerPage)}
      />
    </div>
  )
}

export default UsersListPagination
