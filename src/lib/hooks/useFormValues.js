import { useEffect, useState } from "react"
import {
  validateName,
  validateUsername,
  validateUsernameAsync,
} from "../users/validateUser"

export const useFormValues = () => {
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      error: undefined,
    },
    username: {
      value: "",
      error: undefined,
      loading: false,
    },
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

    setFormValues(lastValues => ({
      ...lastValues,
      username: {
        value: username,
        error,
        loading: !error,
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

  useEffect(() => {
    if (formValues.username.loading) {
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
    }
  }, [])

  return {
    ...formValues,
    setName,
    setUsername,
  }
}
