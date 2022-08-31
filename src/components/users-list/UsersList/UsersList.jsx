import { useFilters } from "lib/hooks/useFilters"
import { USERS_FORM_PANELS } from "../../../constants/usersFormsPanels"
import { useFormsPanel } from "../../../lib/hooks/useFormsPanel"
import { useUsers } from "../../../lib/hooks/useUser"
import { usersToDisplay } from "../../../lib/users/filterUsers"
import Button from "../../Button/Button"
import UsersFormLayout from "../UsersFormLayout/UsersFormLayout"
import UsersListCreateForm from "../UsersListCreateForm/UsersListCreateForm"
import UsersListFilters from "../UsersListFilters/UsersListFilters"
import UsersListPagination from "../UsersListPagination"
import UsersListRows from "../UsersListRows"

import style from "./UserList.module.css"

const UsersList = () => {
  const { currentFormPanel, setCreatePanel, setFiltersPanel } = useFormsPanel()
  const {
    filters,
    pagination,
    filtersSetters,
    paginationSetters,
    resetFilters,
  } = useFilters()

  const { users, usersError, usersLoading, reloadUsers } = useUsers()

  const { filteredUsers, totalPages } = usersToDisplay(
    users,
    filters,
    pagination
  )

  const onSuccess = () => {
    reloadUsers()
    resetFilters()
    setFiltersPanel()
  }

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
        <UsersFormLayout onClose={setFiltersPanel}>
          <UsersListCreateForm onSuccess={onSuccess} />
        </UsersFormLayout>
      )}
      <UsersListRows
        users={filteredUsers}
        error={usersError}
        loading={usersLoading}
      />
      <UsersListPagination
        {...pagination}
        {...paginationSetters}
        totalPages={totalPages}
      />
    </section>
  )
}

export default UsersList
