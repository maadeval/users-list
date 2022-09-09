import { useEffect, useReducer } from "react"
import {
  validateName,
  validateUsername,
  validateUsernameAsync,
} from "../users/validateUser"

export const useEditForm = initialUser => {
  const [formValues, dispatchFormValues] = useReducer(
    formValuesReducer,
    initialUser,
    getInitialState
  )

  useEffect(() => {
    dispatchFormValues({ type: "replace", value: getInitialState(initialUser) })
  }, [initialUser])

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
    areInitialValues(formValues, initialUser) ||
    !formValues.name.value ||
    !formValues.username.value ||
    formValues.name.error ||
    formValues.username.error ||
    formValues.username.loading

  return {
    ...formValues,
    isFormInvalid,
    dispatchFormValues,
  }
}

const getInitialState = initialUser => ({
  name: {
    value: initialUser.name,
    error: undefined,
  },
  username: {
    value: initialUser.username,
    error: undefined,
    loading: false,
  },
  role: initialUser.role,
  active: initialUser.active,
})

const areInitialValues = (formValues, initialUser) => {
  const { name, username, role, active } = formValues

  return (
    name.value === initialUser.name &&
    username.value === initialUser.username &&
    role === initialUser.role &&
    active === initialUser.active
  )
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
      const isInitialUser = action.value === state.username

      return {
        ...state,
        username: {
          value: action.value,
          error,
          loading: !error && !isInitialUser,
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
    case "active_changed":
      return {
        ...state,
        active: action.value,
      }
    case "role_changed":
      return {
        ...state,
        role: action.value,
      }
    case "replace":
      return action.value
    default:
      throw new Error('Invalid action type: "' + action.type + '"')
  }
}
