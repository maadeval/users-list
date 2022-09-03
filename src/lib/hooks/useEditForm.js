import { useEffect, useState } from "react"
import {
  validateName,
  validateUsername,
  validateUsernameAsync,
} from "../users/validateUser"

export const useEditForm = initialUser => {
  const [formValues, setFormValues] = useState({
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

  const setName = name => {
    const error = validateName(name)

    setFormValues(lastValues => ({
      ...lastValues,
      name: {
        value: name,
        error,
      },
    }))
  }

  const setUsername = username => {
    const error = validateUsername(username)
    const isInitialUser = username === initialUser.username

    setFormValues(lastValues => ({
      ...lastValues,
      username: {
        value: username,
        error,
        loading: !error && !isInitialUser,
      },
    }))
  }

  const setUsernameError = error =>
    setFormValues(lastValues => ({
      ...lastValues,
      username: {
        ...lastValues.username,
        error,
        loading: false,
      },
    }))

  const setActive = active =>
    setFormValues(lastState => ({
      ...lastState,
      active,
    }))

  const setRole = role =>
    setFormValues(lastState => ({
      ...lastState,
      role,
    }))

  useEffect(() => {
    if (!formValues.username.loading) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      validateUsernameAsync(formValues.username.value, setUsernameError, {
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
    setName,
    setUsername,
    isFormInvalid,
    setActive,
    setRole,
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
