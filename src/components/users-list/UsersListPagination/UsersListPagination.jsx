import { PAGE_VALUES } from "../../../constants/pageSelectors"
import Select from "../../forms/Select/Select"
import PageSelector from "../../PageSelector/PageSelector"

import style from "./UsersListPagination.module.css"

const UsersListPagination = ({
  page,
  usersPerPage,
  totalUsers,
  dispatchFilters,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.selectorPage}>
        <Select
          value={usersPerPage}
          onChange={e =>
            dispatchFilters({
              type: "users_per_page_changed",
              value: Number(e.target.value),
            })
          }>
          {PAGE_VALUES.USERS_PER_PAGE_OPTIONS.map(pageValue => (
            <option key={pageValue} value={pageValue}>
              {pageValue}
            </option>
          ))}
        </Select>
        <label>Elementos por pagina</label>
      </div>
      <PageSelector
        currentPage={page}
        setPage={newPage =>
          dispatchFilters({ type: "page_changed", value: newPage })
        }
        totalPages={Math.ceil(totalUsers / usersPerPage)}
      />
    </div>
  )
}

export default UsersListPagination
