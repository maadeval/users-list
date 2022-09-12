import { useEffect, useReducer } from "react"
import { replaceChanged } from "../actions/editFormActions"
import {
  editFormValuesReducer,
  getFormValuesInitialState,
} from "../reducers/editFormReducer"

import { validateUsernameAsync } from "../users/validateUser"

export const useEditForm = initialUser => {
  const [formEditValues, dispatchFormEditValues] = useReducer(
    editFormValuesReducer,
    initialUser,
    getFormValuesInitialState
  )

  useEffect(() => {
    dispatchFormEditValues(
      replaceChanged(getFormValuesInitialState(initialUser))
    )
  }, [initialUser])

  useEffect(() => {
    if (!formEditValues.username.loading) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      validateUsernameAsync(
        formEditValues.username.value,
        dispatchFormEditValues,
        {
          signal: controller.signal,
        }
      )
    }, 500)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [formEditValues.username.loading, formEditValues.username.value])

  const isFormInvalid =
    areInitialValues(formEditValues, initialUser) ||
    !formEditValues.name.value ||
    !formEditValues.username.value ||
    formEditValues.name.error ||
    formEditValues.username.error ||
    formEditValues.username.loading

  return {
    ...formEditValues,
    isFormInvalid,
    dispatchFormEditValues,
  }
}

const areInitialValues = (formValues, initialUser) => {
  const { name, username, role, active } = formValues

  return (
    name.value === initialUser.name &&
    username.value === initialUser.username &&
    role === initialUser.role &&
    active === initialUser.active
  )
}
