import { useState } from "react"
import { USERS_FORM_PANELS } from "../../constants/usersFormsPanels"

export const useFormsPanel = () => {
  const [currentFormPanel, setCurrentFormPanel] = useState(
    USERS_FORM_PANELS.FILTERS
  )

  const setFiltersPanel = () => setCurrentFormPanel(USERS_FORM_PANELS.FILTERS)
  const setCreatePanel = () => setCurrentFormPanel(USERS_FORM_PANELS.CREATE)
  const setEditPanel = () => setCurrentFormPanel(USERS_FORM_PANELS.EDIT)
  const setDeletePanel = () => setCurrentFormPanel(USERS_FORM_PANELS.DELETE)

  return {
    currentFormPanel,
    setFiltersPanel,
    setCreatePanel,
    setEditPanel,
    setDeletePanel,
  }
}
