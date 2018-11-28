import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/UserView.scss'
import UserAvatar from '../components/UserAvatar'
import UserDetails from '../components/UserDetails'

export class UserView extends PureComponent {

  state = {

  }

  render(){
    return (
      <React.Fragment>
      <div className="user-background">
      </div>
      <div className="user-container">
        <p>This is the user view.</p>
        <UserAvatar />
        <UserDetails />
      </div>
      </React.Fragment>
  )}
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(UserView)
