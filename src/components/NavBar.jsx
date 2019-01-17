import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/NavBar.scss'
import LinkBar from './LinkBar'

const trailkey = "ENV['TRAILS']"
const profiles = `https://trailblazer-rails.herokuapp.com/api/v1/profile`

class NavBar extends PureComponent {

  state = {
    expanded: true
  }

  getRecommendations = () => {
    if(this.props.user.coords){
      let { lat,lng } = this.props.user.coords
      fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=200&maxResults=20&key=${trailkey}`).then(res=>res.json()).then(recs => this.props.dispatch({type: "SET_RECOMMENDATIONS", recommendations: recs.trails}))
    }
  }

  componentDidMount(){
    if(localStorage.token && !this.props.logged_in){
      fetch(profiles, {
        method: 'GET',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => response.json())
      .then(autheduser => {
        this.props.dispatch({type: "AUTHED_PAGE_RELOAD", user: autheduser.user, jwt: localStorage.token})
      })
    }
  }

  render() {
    this.getRecommendations()
    return(
      <React.Fragment>
        <div className="navbar">
          {this.props.logged_in ? <img className="avatar" src={this.props.user.avatar_url} alt="avatar" /> : null }
        </div>
        <div className="linkback"></div>
        <LinkBar className="expanded" loggedIn={this.props.logged_in} />}
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {  logged_in: state.logged_in, user: state.user }
}

export default connect(mapStateToProps)(NavBar)
