import { useState } from "react"
import { USERS_FORM_PANELS } from "../../constants/usersFormsPanels"

export const useFormsPanel = () => {
  const [currentFormPanel, setCurrentFormPanel] = useState({
    form: USERS_FORM_PANELS.FILTERS,
  })

  const setFiltersPanel = () =>
    setCurrentFormPanel({ form: USERS_FORM_PANELS.FILTERS })

  const setCreatePanel = () =>
    setCurrentFormPanel({ form: USERS_FORM_PANELS.CREATE })

  const setEditPanel = user =>
    setCurrentFormPanel({ form: USERS_FORM_PANELS.EDIT, user })

  const setDeletePanel = user =>
    setCurrentFormPanel({ form: USERS_FORM_PANELS.DELETE, user })

  return {
    currentFormPanel: currentFormPanel.form,
    currentUser: currentFormPanel.user,
    setFiltersPanel,
    setCreatePanel,
    setEditPanel,
    setDeletePanel,
  }
}
