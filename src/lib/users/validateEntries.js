export const validateName = name => {
  if (name.length < 3 || name.length > 20) {
    return "Name must be between 3 and 20 characters"
  }
}

export const validateUsername = username => {
  if (username.length < 3 || username.length > 20) {
    return "Username must be between 3 and 20 characters"
  }
}
