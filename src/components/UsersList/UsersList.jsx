import { useFilters } from "lib/hooks/useFilters"
import { USERS_FORM_PANELS } from "../../constants/usersFormsPanels"
import { useFormsPanel } from "../../lib/hooks/useFormsPanel"
import { useUsers } from "../../lib/hooks/useUser"
import Button from "../Button/Button"
import UsersListCreateForm from "../UsersListCreateForm/UsersListCreateForm"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const { currentFormPanel, setCreatePanel, setFiltersPanel } = useFormsPanel()
  const { filters, setActive, setPage, setSearch, setSort, setUsersPerPage } =
    useFilters()
  const { filteredUsers, totalPages, error, loading } = useUsers(filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      {currentFormPanel === USERS_FORM_PANELS.FILTERS ? (
        <UsersListFilters
          search={filters.search}
          active={filters.active}
          sort={filters.sort}
          setSearch={setSearch}
          setActive={setActive}
          setSort={setSort}
          slot={<Button onClick={setCreatePanel}>Agregar Usuario</Button>}
        />
      ) : (
        <UsersListCreateForm onClose={setFiltersPanel} />
      )}
      <UsersListRows users={filteredUsers} error={error} loading={loading} />
      <UsersListPagination
        page={filters.page}
        usersPerPage={filters.usersPerPage}
        setPage={setPage}
        setUsersPerPage={setUsersPerPage}
        totalPages={totalPages}
      />
    </section>
  )
}

export default UsersList
