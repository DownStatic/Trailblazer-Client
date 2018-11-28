import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/NavBar.scss'
import LinkBar from './LinkBar'

class NavBar extends PureComponent {

  state = {
    expanded: false
  }

  expandLinkbar = () => {
    this.setState((currentstate) => {
      return {expanded: !currentstate.expanded}
    })
  }

  render() {
    return(
      <React.Fragment>
        <div className="navbar" onClick={this.expandLinkbar}>
          {this.props.logged_in ? <img className="avatar" src={this.props.user.avatar_url} alt="avatar" /> : null }
        </div>
        {this.state.expanded ? <LinkBar className="expanded" loggedIn={this.props.logged_in} /> : <LinkBar className="collapsed" loggedIn={this.props.logged_in} />}
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {  logged_in: state.logged_in, user: state.user }
}

export default connect(mapStateToProps)(NavBar)
