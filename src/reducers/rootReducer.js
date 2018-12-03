import { combineReducers } from 'redux'
import initialState from './initialState'

const logged_in = (state=initialState.logged_in, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return true
    case "AUTHED_PAGE_RELOAD":
      return true
    case "SUCCESSFUL_LOGOUT":
      return false
    default:
      return state
  }
}

const user = (state=initialState.user, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.user
    case "AUTHED_PAGE_RELOAD":
      return action.user
    case "SUCCESSFUL_LOGOUT":
      return {}
    default:
      return state
  }
}

const recommendations = (state=initialState.recommendations, action) => {
  switch(action.type){
    case "SET_RECOMMENDATIONS":
      return action.recommendations
    default:
      return state
  }
}

const jwt = (state=initialState.jwt, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.jwt
    case "AUTHED_PAGE_RELOAD":
      return action.jwt
    case "SUCCESSFUL_LOGOUT":
      return ""
    default:
      return state
  }
}


export default combineReducers({
  user,
  logged_in,
  recommendations,
  jwt
})
