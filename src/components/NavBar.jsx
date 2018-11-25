import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export default class NavBar extends PureComponent {

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
        </div>
        {this.state.expanded ? <p>Expanded!</p> : <p>Not expanded</p>}
      </React.Fragment>
    )
  }

}
