import React from 'react'
import '../assets/scss/LinkBar.scss'
import { Link } from 'react-router-dom'

const LinkBar = (props) => {


  return (
    <div className={props.className}>
      <div className="linkcontainer">
        {props.loggedIn ? <Link to='/Login'>Switch User</Link> : <Link to='/Login'>Login</Link>}
        <Link to='/Search'>Search</Link>
        <Link to={props.loggedIn ? '/Profile' : '/Login'}>Profile</Link>
        {props.loggedIn ? <Link to='/LoggedOut'>Log Out</Link> : <Link to='/Signup'>Sign up</Link>}
        <Link to='/About'>About</Link>
      </div>
      <h2 className="trailblazer-text">TrailBlazer</h2>
    </div>
  )
}

export default LinkBar
