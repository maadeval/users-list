import { useFilters } from "lib/hooks/useFilters"
import { USERS_FORM_PANELS } from "../../constants/usersFormsPanels"
import { useFormsPanel } from "../../lib/hooks/useFormsPanel"
import { useUsers } from "../../lib/hooks/useUser"
import { usersToDisplay } from "../../lib/users/filterUsers"
import Button from "../Button/Button"
import UsersListCreateForm from "../UsersListCreateForm/UsersListCreateForm"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const { currentFormPanel, setCreatePanel, setFiltersPanel } = useFormsPanel()
  const { filters, pagination, filtersSetters, paginationSetters } =
    useFilters()

  const { users, error, loading } = useUsers()

  const { filteredUsers, totalPages } = usersToDisplay(users, filters)

  return (
    <section className={style.layout}>
      <h1 className={style.title}>Lista de usuarios</h1>
      {currentFormPanel === USERS_FORM_PANELS.FILTERS ? (
        <UsersListFilters
          {...filters}
          {...filtersSetters}
          slot={<Button onClick={setCreatePanel}>Agregar Usuario</Button>}
        />
      ) : (
        <UsersListCreateForm onClose={setFiltersPanel} />
      )}
      <UsersListRows users={filteredUsers} error={error} loading={loading} />
      <UsersListPagination
        {...pagination}
        {...paginationSetters}
        totalPages={totalPages}
      />
    </section>
  )
}

export default UsersList
