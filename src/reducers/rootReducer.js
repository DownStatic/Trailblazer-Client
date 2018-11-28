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

const user = (state=initialState.user, action) => {
  switch(action.type){
    case "SUCCESSFUL_LOGIN":
      return action.user
    case "SUCCESSFUL_LOGOUT":
      return {}
    default:
      return state
  }
}


export default combineReducers({
  user,
  logged_in
})
