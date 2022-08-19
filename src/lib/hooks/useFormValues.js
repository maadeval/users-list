import { useState } from "react"
import { validateName, validateUsername } from "../users/validateEntries"

export const useFormValues = () => {
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      error: undefined,
    },
    username: {
      value: "",
      error: undefined,
    },
  })

  const setName = nameValue => {
    const error = validateName(nameValue)
    setFormValues({
      ...formValues,
      name: {
        value: nameValue,
        error,
      },
    })
  }

  const setUsername = usernameValue => {
    const error = validateUsername(usernameValue)
    setFormValues({
      ...formValues,
      username: {
        value: usernameValue,
        error,
      },
    })
  }

  return {
    ...formValues,
    setName,
    setUsername,
  }
}
