import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../assets/scss/UserView.scss'
import UserAvatar from '../components/UserAvatar'
import UserDetails from '../components/UserDetails'
import RecommendationBox from '../components/RecommendationBox'


const trailkey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"

export class UserView extends PureComponent {

  getRecommendations = () => {
    let { lat,lng } = this.props.user.coords
    fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=200&key=${trailkey}`).then(res=>res.json()).then(recs => this.props.dispatch({type: "SET_RECOMMENDATIONS", recommendations: recs.trails}))
  }

  componentDidMount(){
    this.getRecommendations()
  }

  render(){

    return (
      <React.Fragment>
      <div className="user-background">
      </div>
      <div className="user-container">
        <p>This is the user view.</p>
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
