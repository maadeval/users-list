import { findUserByUsername } from "../services/findUserByUsername"

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

export const validateUsernameAsync = async (
  username,
  setUsernameError,
  { signal }
) => {
  const { user, aborted, error } = await findUserByUsername(username, signal)

  if (aborted) return

  let errorMessage

  if (error) errorMessage = "Error al validar"
  else if (user) errorMessage = "Ya existe un usuario con ese nombre"

  setUsernameError(errorMessage)
}
