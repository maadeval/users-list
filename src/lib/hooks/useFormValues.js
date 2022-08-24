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

  useEffect(() => {
    const controller = new AbortController()

    if (formValues.username.loading) {
      validateUsernameAsync(
        formValues.username.value,
        setFormValues,
        controller.signal
      )
    }

    return () => controller.abort()
  }, [formValues.username.loading, formValues.username.value])

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

  return {
    ...formValues,
    setName,
    setUsername,
  }
}
