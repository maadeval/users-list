import { CREATE_FORM_ACTIONS } from "../../constants/reducer-actions/createFormActions"
import { validateName, validateUsername } from "../users/validateUser"

export const FORM_VALUES_INITIAL_STATE = {
  name: {
    value: "",
    error: undefined,
  },
  username: {
    value: "",
    error: undefined,
    loading: false,
  },
}

export const formValuesReducer = (state, { type, payload }) => {
  switch (type) {
    case CREATE_FORM_ACTIONS.NAME: {
      const error = validateName(payload)

      return {
        ...state,
        name: {
          value: payload,
          error,
        },
      }
    }
    case CREATE_FORM_ACTIONS.USERNAME: {
      const error = validateUsername(payload)

      return {
        ...state,
        username: {
          value: payload,
          error,
          loading: !error,
        },
      }
    }
    case CREATE_FORM_ACTIONS.USERNAME_ERROR:
      return {
        ...state,
        username: {
          ...state.username,
          error: payload,
          loading: false,
        },
      }
    default:
      throw new Error("Invalid action type")
  }
}
