const REGEX = {
  name: /^[a-záéíóú\s-]+$/i,
  username: /^[a-z0-9]+$/,
  startWithNum: /^[0-9]$/,
}

const NAME_LENGTH = {
  MIN: 3,
  MAX: 30,
}

const USERNAME_LENGTH = {
  MIN: 6,
  MAX: 15,
}

export const validateUsernameAsync = async (
  username,
  setFormValues,
  { signal }
) => {
  let error
  try {
    const res = await fetch(
      `http://localhost:4000/users?username=${username}`,
      { signal }
    )
    if (res.ok) {
      const users = await res.json()
      error = !!users.length && "Ya existe un usuario con ese nombre"
    } else {
      error = "Error al validar el nombre de usuario"
    }

    setFormValues(lastValues => ({
      ...lastValues,
      username: {
        ...lastValues.username,
        error,
        loading: false,
      },
    }))
  } catch {
    setFormValues(lastValues => ({
      ...lastValues,
      username: {
        ...lastValues.username,
        error: "No se pudo conectar con el servidor",
        loading: false,
      },
    }))
  }
}

export const validateName = name => {
  if (name.length < NAME_LENGTH.MIN || name.length > NAME_LENGTH.MAX)
    return `Debe tener entre ${NAME_LENGTH.MIN} y ${NAME_LENGTH.MAX} caracteres`

  if (name.includes("  ") || name.includes("--"))
    return "No se permiten espacios dobles ni guiones dobles"

  const splitWords = name.split(" ")
  const startAndEndWithDash = splitWords.some(
    word => word.startsWith("-") || word.endsWith("-")
  )

  if (startAndEndWithDash)
    return "No se permiten empezar ni terminar con guiones"
}

export const validateUsername = username => {
  if (
    username.length < USERNAME_LENGTH.MIN ||
    username.length > USERNAME_LENGTH.MAX
  )
    return `Debe tener entre ${USERNAME_LENGTH.MIN} y ${USERNAME_LENGTH.MAX} caracteres`

  if (REGEX.startWithNum.test(username)) return "No puede empezar por numeros"

  if (!REGEX.username.test(username))
    return "Solo se permiten minusculas y numeros"
}
