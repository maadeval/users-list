import { FILTERS_ACTIONS } from "../../constants/reducer-actions/filtersActions"

export const searchChanged = search => ({
  type: FILTERS_ACTIONS.SEARCH,
  payload: search,
})

export const sortByChanged = sortBy => ({
  type: FILTERS_ACTIONS.SORT_BY,
  payload: sortBy,
})

export const activeChanged = active => ({
  type: FILTERS_ACTIONS.ACTIVE,
  payload: active,
})

export const usersPerPageChanged = usersPerPage => ({
  type: FILTERS_ACTIONS.USERS_PER_PAGE,
  payload: usersPerPage,
})

export const pageChanged = page => ({
  type: FILTERS_ACTIONS.PAGE,
  payload: page,
})

export const resetChanged = () => ({
  type: FILTERS_ACTIONS.RESET,
})
