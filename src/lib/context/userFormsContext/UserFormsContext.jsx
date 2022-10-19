import { createContext } from "react"
import { resetChanged } from "../../actions/filtersActions"

export const UserFormsContext = createContext()

export const UserFormsProvider = ({ children, dispatchFilters }) => {
  const onSuccess = () => {
    dispatchFilters(resetChanged())
  }

  return (
    <UserFormsContext.Provider
      value={{
        onSuccess,
      }}>
      {children}
    </UserFormsContext.Provider>
  )
}
