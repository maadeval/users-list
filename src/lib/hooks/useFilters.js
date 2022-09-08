import { useReducer } from "react"
import { PAGE_VALUES } from "../../constants/pageSelectors"
import { SORT_OPTIONS } from "../../constants/sortUsersSelect"

export const useFilters = () => {
  const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_STATE)

  return {
    filters,
    dispatchFilters,
  }
}

const INITIAL_STATE = {
  search: "",
  active: false,
  sort: SORT_OPTIONS.DEFAULT,
  page: PAGE_VALUES.PAGE,
  usersPerPage: PAGE_VALUES.USERS_PER_PAGE,
}

const filtersReducer = (state, action) => {
  switch (action.type) {
    case "search_changed":
      return {
        ...state,
        page: PAGE_VALUES.PAGE,
        search: action.value,
      }
    case "active_changed":
      return { ...state, page: PAGE_VALUES.PAGE, active: action.value }
    case "sort_changed":
      return { ...state, page: PAGE_VALUES.PAGE, sort: action.value }
    case "page_changed":
      return { ...state, page: action.value }
    case "users_per_page_changed":
      return { ...state, page: PAGE_VALUES.PAGE, usersPerPage: action.value }
    case "reset":
      return {
        ...INITIAL_STATE,
      }
    default:
      throw new Error("Invalid action type")
  }
}
