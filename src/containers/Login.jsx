import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/Login.scss'

class Login extends PureComponent {

  state = {
    username: "",
    password: ""
  }

  render(){
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
    console.log("Attempting login...");
    let target = `http://localhost:3000/api/v1/users/`
    fetch(target).then(res => res.json()).then(allusers => {
      let autheduser = allusers.filter(u => u.name === this.state.username && u.password === this.state.password)
      console.log(autheduser);
      if(autheduser.length === 1){
        autheduser = autheduser[0]
        this.props.dispatch({type: "SUCCESSFUL_LOGIN", username: autheduser.name, avatar_url: autheduser.avatar_url, user_id: autheduser.id, user: autheduser})
      }
    })
  }

}


const mapStateToProps = state => {
  return { username: state.username, password: state.password, logged_in: state.logged_in }
}

export default connect(mapStateToProps)(Login)
