import React from 'react'
import { connect } from 'react-redux'
import '../assets/scss/LoggedOut.scss'

const LoggedOut = (props) => {
  props.dispatch({type: "SUCCESSFUL_LOGOUT"})
  localStorage.removeItem('token')
  return(
    <div className="logout">
      <div className="happy-trails-container">
        <p>Happy Trails...</p>
      </div>
    </div>
  )
}

export default connect()(LoggedOut)
