import { CREATE_FORM_ACTIONS } from "../../constants/reducer-actions/createFormActions"

export const formValuesNameChanged = name => ({
  type: CREATE_FORM_ACTIONS.NAME,
  payload: name,
})

export const formValuesUsernameChanged = username => ({
  type: CREATE_FORM_ACTIONS.USERNAME,
  payload: username,
})
