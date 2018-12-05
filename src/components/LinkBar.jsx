import React from 'react'
import '../assets/scss/LinkBar.scss'
import { Link } from 'react-router-dom'

const LinkBar = (props) => {


  return (
    <div className={props.className}>
      <div className="linkcontainer">
        {props.loggedIn ? null : <Link to='/Signup'>Sign Up</Link>}
        <Link to='/Search'>Search</Link>
        <Link to={props.loggedIn ? '/Profile' : '/Login'}>Profile</Link>
        {props.loggedIn ? <Link to='/LoggedOut'>Log Out</Link> : <Link to='/Login'>Log In</Link>}
        <Link to='/About'>About</Link>
      </div>
      <h2 className="trailblazer-text">TrailBlazer</h2>
    </div>
  )
}

export default LinkBar
