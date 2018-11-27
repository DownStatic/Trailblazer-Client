import React from 'react'
import '../assets/scss/LinkBar.scss'
import { Link } from 'react-router-dom'

const LinkBar = (props) => {


  return (
    <div className={props.className}>
      <Link to='/App'>Login</Link>
      <Link to='/Search'>Search</Link>
      <Link to='/Profile'>Profile</Link>
      <Link to='/Signup'>Sign up</Link>
    </div>
  )
}

export default LinkBar
