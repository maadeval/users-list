import { createContext } from "react"
import { useFormsPanel } from "../../hooks/useFormsPanel"

export const UserFormsContext = createContext()

export const UserFormsProvider = ({ children, resetFilters }) => {
  const {
    currentFormPanel,
    currentUser,
    setCreatePanel,
    setFiltersPanel,
    setDeletePanel,
    setEditPanel,
  } = useFormsPanel()

  const onSuccess = () => {
    resetFilters()
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
