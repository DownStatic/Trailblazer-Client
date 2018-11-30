import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/NavBar.scss'
import LinkBar from './LinkBar'

class NavBar extends PureComponent {

  state = {
    expanded: true
  }


  render() {
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
