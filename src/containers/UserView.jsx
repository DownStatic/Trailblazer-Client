import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../assets/scss/UserView.scss'
import UserAvatar from '../components/UserAvatar'
import UserDetails from '../components/UserDetails'
import RecommendationBox from '../components/RecommendationBox'

export class UserView extends PureComponent {

  render(){
    return (
      <React.Fragment>
      <div className="user-background">
      </div>
      <div className="user-container">
        <UserAvatar avatar={this.props.user.avatar_url}/>
        <UserDetails user={this.props.user}/>
        <RecommendationBox />
      </div>
      </React.Fragment>
  )}
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(UserView)
