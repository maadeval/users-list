import Select from "../forms/Select/Select"
import PageSelector from "../PageSelector/PageSelector"

import style from "./UsersListPagination.module.css"

const UsersListPagination = ({
  page,
  usersPerPage,
  setPage,
  setUsersPerPage,
  totalPages,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.selectorPage}>
        <Select
          value={usersPerPage}
          onChange={e => setUsersPerPage(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </Select>
        <label>Elementos por pagina</label>
      </div>
      <PageSelector
        currentPage={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default UsersListPagination
