import { useEffect, useReducer } from "react"
import {
  formValuesReducer,
  FORM_VALUES_INITIAL_STATE,
} from "../reducers/formValuesReducer"
import { validateUsernameAsync } from "../users/validateUser"

export const useCreateForm = () => {
  const [formValues, dispatchFormValues] = useReducer(
    formValuesReducer,
    FORM_VALUES_INITIAL_STATE
  )

  useEffect(() => {
    if (!formValues.username.loading) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      validateUsernameAsync(formValues.username.value, dispatchFormValues, {
        signal: controller.signal,
      })
    }, 500)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [formValues.username.loading, formValues.username.value])

  const isFormInvalid =
    !formValues.name.value ||
    !formValues.username.value ||
    formValues.name.error ||
    formValues.username.error ||
    formValues.username.loading

  return {
    ...formValues,
    dispatchFormValues,
    isFormInvalid,
  }
}
