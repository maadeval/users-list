import { useContext } from "react"
import { USERS_FORM_PANELS } from "../../../constants/usersFormsPanels"
import { UserFormsContext } from "../../../lib/context/userFormsContext/UserFormsContext"
import ButtonIcon from "../../ButtonIcon"
import CrossIcon from "../../icons/CrossIcon/CrossIcon"
import UsersListCreateForm from "../UsersListCreateForm/UsersListCreateForm"
import UsersListDeleteForm from "../UsersListDeleteForm/UsersListDeleteForm"
import UsersListEditForm from "../UsersListEditForm"

import style from "./UsersFormContainer.module.css"

const UsersFormContainer = () => {
  const { setFiltersPanel, currentFormPanel } = useContext(UserFormsContext)

  const form = FORMS[currentFormPanel]

  if (!form) return null

  return (
    <div className={style.wrapper}>
      <ButtonIcon
        className={style.close}
        icon={CrossIcon}
        isFill
        onClick={setFiltersPanel}
      />
      {form}
    </div>
  )
}

const FORMS = {
  [USERS_FORM_PANELS.CREATE]: <UsersListCreateForm />,
  [USERS_FORM_PANELS.EDIT]: <UsersListEditForm />,
  [USERS_FORM_PANELS.DELETE]: <UsersListDeleteForm />,
}

export default UsersFormContainer
