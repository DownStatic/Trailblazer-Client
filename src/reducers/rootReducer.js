import { combineReducers } from 'redux'
import initialState from './initialState'

const logged_in = (state=initialState.logged_in, action) => {
  switch(action.type){
    case "ATTEMPT_LOGIN":
      return action.payload
    default:
      return state
  }
}

const username = (state=initialState.username, action) => {
  switch(action.type){
    case "USER_INPUT":
      return action.payload
    default:
      return state
  }
}


export default combineReducers({
  username,
  logged_in
})
