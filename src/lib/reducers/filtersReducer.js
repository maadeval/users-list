import { PAGE_VALUES } from "../../constants/pageSelectors"
import { FILTERS_ACTIONS } from "../../constants/reducer-actions/filtersActions"
import { SORT_OPTIONS } from "../../constants/sortUsersSelect"

export const FILTERS_INITIAL_STATE = {
  search: "",
  active: false,
  sort: SORT_OPTIONS.DEFAULT,
  page: PAGE_VALUES.PAGE,
  usersPerPage: PAGE_VALUES.USERS_PER_PAGE,
}

export const filtersReducer = (state, { type, payload }) => {
  switch (type) {
    case FILTERS_ACTIONS.SEARCH:
      return {
        ...state,
        page: PAGE_VALUES.PAGE,
        search: payload,
      }
    case FILTERS_ACTIONS.ACTIVE:
      return { ...state, page: PAGE_VALUES.PAGE, active: payload }
    case FILTERS_ACTIONS.SORT_BY:
      return { ...state, page: PAGE_VALUES.PAGE, sort: payload }
    case FILTERS_ACTIONS.PAGE:
      return { ...state, page: payload }
    case FILTERS_ACTIONS.USERS_PER_PAGE:
      return { ...state, page: PAGE_VALUES.PAGE, usersPerPage: payload }
    case FILTERS_ACTIONS.RESET:
      return {
        ...FILTERS_INITIAL_STATE,
      }
    default:
      throw new Error("Invalid action type")
  }
}
