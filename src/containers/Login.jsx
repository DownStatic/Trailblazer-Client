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
        <button onClick={this.attemptLogin}>Login</button>
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  attemptLogin = () => {
    let target = `http://localhost:3000/api/v1/users/`
    fetch(target).then(res => res.json()).then(allusers => {
      let autheduser = allusers.filter(u => u.name === this.state.username && u.password === this.state.password)
      if(autheduser.length === 1){
        autheduser = autheduser[0]
        this.props.dispatch({type: "SUCCESSFUL_LOGIN", user: autheduser})
      }
    })
  }

}


const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

export default connect(mapStateToProps)(Login)
