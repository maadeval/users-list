import { useEffect, useReducer } from "react"
import {
  validateName,
  validateUsername,
  validateUsernameAsync,
} from "../users/validateUser"

export const useCreateForm = () => {
  const [formValues, dispatchFormValues] = useReducer(
    formValuesReducer,
    initialState
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

const initialState = {
  name: {
    value: "",
    error: undefined,
  },
  username: {
    value: "",
    error: undefined,
    loading: false,
  },
}

const formValuesReducer = (state, action) => {
  switch (action.type) {
    case "name_changed": {
      const error = validateName(action.value)

      return {
        ...state,
        name: {
          value: action.value,
          error,
        },
      }
    }
    case "username_changed": {
      const error = validateUsername(action.value)

      return {
        ...state,
        username: {
          value: action.value,
          error,
          loading: !error,
        },
      }
    }
    case "username_error_changed":
      return {
        ...state,
        username: {
          ...state.username,
          error: action.value,
          loading: false,
        },
      }
    default:
      throw new Error("Invalid action type")
  }
}
