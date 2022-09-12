import { createContext } from "react"
import { resetChanged } from "../../actions/filtersActions"
import { useFormsPanel } from "../../hooks/useFormsPanel"

export const UserFormsContext = createContext()

export const UserFormsProvider = ({ children, dispatchFilters }) => {
  const {
    currentFormPanel,
    currentUser,
    setCreatePanel,
    setFiltersPanel,
    setDeletePanel,
    setEditPanel,
  } = useFormsPanel()

  const onSuccess = () => {
    dispatchFilters(resetChanged())
    setFiltersPanel()
  }

  return (
    <UserFormsContext.Provider
      value={{
        currentFormPanel,
        currentUser,
        onSuccess,
        setCreatePanel,
        setDeletePanel,
        setEditPanel,
        setFiltersPanel,
      }}>
      {children}
    </UserFormsContext.Provider>
  )
}
