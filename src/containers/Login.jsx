import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Login extends PureComponent {

  render(){
    return(
      <div className="login-form">
        <input type="text" placeholder="username" onChange={this.handleUserInput}></input>
        <button onClick={this.attemptLogin}>Login</button>
      </div>
    )
  }

  handleUserInput = (event) => {
    this.props.dispatch({type: "USER_INPUT", payload: event.target.value})
  }

  attemptLogin = () => {
    this.props.dispatch({type: "ATTEMPT_LOGIN", payload: true})
  }

}


const mapStateToProps = state => {
  return { username: state.username, logged_in: state.logged_in }
}

export default connect(mapStateToProps)(Login)
