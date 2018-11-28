import { combineReducers } from 'redux'
import initialState from './initialState'

const logged_in = (state=initialState.logged_in, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return true
    case "SUCCESSFUL_LOGOUT":
      return false
    default:
      return state
  }
}

const username = (state=initialState.username, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.username
    case "SUCCESSFUL_LOGOUT":
      return ""
    default:
      return state
  }
}

const avatar_url = (state=initialState.avatar_url, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.avatar_url
    case "SUCCESSFUL_LOGOUT":
      return ""
    default:
      return state
  }
}

const user_id = (state=initialState.user_id, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.user_id
    case "SUCCESSFUL_LOGOUT":
      return 0
    default:
      return state
  }
}

export default combineReducers({
  username,
  avatar_url,
  user_id,
  logged_in
})
