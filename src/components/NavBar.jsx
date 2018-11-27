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
          {this.props.avatar_url ? <img className="avatar" src={this.props.avatar_url} alt="avatar" /> : null }
        </div>
        {this.state.expanded ? <LinkBar className="expanded" /> : <LinkBar className="collapsed" />}
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return { avatar_url: state.avatar_url, logged_in: state.logged_in }
}

export default connect(mapStateToProps)(NavBar)
