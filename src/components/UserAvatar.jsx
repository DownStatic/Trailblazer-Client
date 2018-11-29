import React from 'react'
import '../assets/scss/UserAvatar.scss'

const UserAvatar = props => {
  return (
    <div className="user-avatar-container">
      <img className="profile-avatar" src={props.avatar} alt="user-avatar" />
    </div>
  )
}

export default UserAvatar
