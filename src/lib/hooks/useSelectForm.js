import { useState } from "react"
import { FORM_SELECTED } from "../users/formSelected"

export const useSelectForm = () => {
  const [selectedForm, setSelectedForm] = useState(FORM_SELECTED.FILTERS)

  const setFilterForm = () => setSelectedForm(FORM_SELECTED.FILTERS)
  const setCreateForm = () => setSelectedForm(FORM_SELECTED.CREATE)
  const setEditForm = () => setSelectedForm(FORM_SELECTED.EDIT)
  const setDeleteForm = () => setSelectedForm(FORM_SELECTED.DELETE)

  return {
    selectedForm,
    setFilterForm,
    setCreateForm,
    setEditForm,
    setDeleteForm,
  }
}
