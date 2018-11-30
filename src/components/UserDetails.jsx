import React from 'react'
import '../assets/scss/UserDetails.scss'

const UserDetails = props => {
  return (
    <React.Fragment>
      <div className="user-details">
        {Object.keys(props.user).map(key => <p>{key}</p>)}
      </div>
    </React.Fragment>
  )
}

export default UserDetails
