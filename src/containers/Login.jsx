import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../assets/scss/Login.scss'

class Login extends PureComponent {

  state = {
    username: "",
    password: ""
  }

  render(){

    if(this.props.logged_in){
      return (<Redirect to='/Profile' />)
    }

    return(
      <div className="login-form">
        <input type="text" name="username" placeholder="username" onChange={this.handleChange}></input><br></br>
        <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input><br></br>
        <button onClick={this.attemptJWTLogin}>Login</button>
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  attemptJWTLogin = () => {
    let target = "http://localhost:3000/api/v1/login"
    fetch(target, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {name: this.state.username, password: this.state.password}
      })
    }).then(res => res.json()).then(autheduser => {
      if (autheduser.jwt){
        window.localStorage.setItem('token', autheduser.jwt)
        this.props.dispatch({type: "SUCCESSFUL_LOGIN", user: autheduser.user, jwt: autheduser.jwt})
      }
      else {
        alert(`${autheduser.message}`)
      }
    })
  }

}


const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

export default connect(mapStateToProps)(Login)
