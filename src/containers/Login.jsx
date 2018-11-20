import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Login extends PureComponent {

  render(){
    debugger
    return(
      <div className="login-form">
        <input type="text" placeholder="username" onChange={this.handleUserInput}></input>
        <button onClick={this.attemptLogin}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  debugger
  return { username: state.username, logged_in: state.logged_in } 
}

export default connect(mapStateToProps)(Login)
