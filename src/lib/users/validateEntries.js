const REGEX = {
  NAME: /^[a-záéíóú\s-]+$/i,
  USERNAME: /^[a-z0-9]+$/,
  START_WITH_NUMBER: /^[0-9]/,
}

const LENGTH_USERNAME = {
  START: 6,
  END: 15,
}

const LENGTH_NAME = {
  START: 2,
  END: 30,
}

export const validateName = name => {
  if (name.length < LENGTH_NAME.START || name.length > LENGTH_NAME.END)
    return `Debe tener entre ${LENGTH_NAME.START} y ${LENGTH_NAME.END} caracteres`

  if (!REGEX.NAME.test(name)) return "Solo letras, espacios y guiones"

  const splitWords = name.split(" ")
  const isWordStartOrEndWithDash = splitWords.some(
    word => word.startsWith("-") || word.endsWith("-")
  )

  if (isWordStartOrEndWithDash)
    return "No puede empezar ni terminar con un guión"

  const hasDoubleDash = name.includes("--")
  const hasDoubleSpace = name.includes("  ")

  if (hasDoubleDash || hasDoubleSpace)
    return "No puede contener dobles espacios o guiones"
}

export const validateUsername = username => {
  if (
    username.length < LENGTH_USERNAME.START ||
    username.length > LENGTH_USERNAME.END
  )
    return `Debe tener entre ${LENGTH_USERNAME.START} y ${LENGTH_USERNAME.END} caracteres`

  if (!REGEX.USERNAME.test(username)) return "Solo minusculas y numeros"

  if (REGEX.START_WITH_NUMBER.test(username))
    return "No puede empezar con un numero"
}
