import { EDIT_FORM_ACTIONS } from "../../constants/reducer-actions/editFormActions"
import { validateName, validateUsername } from "../users/validateUser"

export const getFormValuesInitialState = initialUser => ({
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

export const editFormValuesReducer = (state, { type, payload }) => {
  switch (type) {
    case EDIT_FORM_ACTIONS.NAME: {
      const error = validateName(payload)

      return {
        ...state,
        name: {
          value: payload,
          error,
        },
      }
    }
    case EDIT_FORM_ACTIONS.USERNAME: {
      const error = validateUsername(payload)
      const isInitialUser = payload === state.username

      return {
        ...state,
        username: {
          value: payload,
          error,
          loading: !error && !isInitialUser,
        },
      }
    }
    case EDIT_FORM_ACTIONS.USERNAME_ERROR:
      return {
        ...state,
        username: {
          ...state.username,
          error: payload,
          loading: false,
        },
      }
    case EDIT_FORM_ACTIONS.ACTIVE:
      return {
        ...state,
        active: payload,
      }
    case EDIT_FORM_ACTIONS.ROLE:
      return {
        ...state,
        role: payload,
      }
    default:
      throw new Error('Invalid action type: "' + type + '"')
  }
}
