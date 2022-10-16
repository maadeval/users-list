import { EDIT_FORM_ACTIONS } from "../../constants/reducer-actions/editFormActions"

export const nameChanged = name => ({
  type: EDIT_FORM_ACTIONS.NAME,
  payload: name,
})

export const usernameChanged = username => ({
  type: EDIT_FORM_ACTIONS.USERNAME,
  payload: username,
})

export const roleChanged = role => ({
  type: EDIT_FORM_ACTIONS.ROLE,
  payload: role,
})

export const activeChanged = active => ({
  type: EDIT_FORM_ACTIONS.ACTIVE,
  payload: active,
})

export const replaceChanged = initialUser => ({
  type: EDIT_FORM_ACTIONS.REPLACE,
  payload: initialUser,
})

export const usernameErrorChanged = error => ({
  type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
  payload: error,
})