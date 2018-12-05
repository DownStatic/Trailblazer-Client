import React from 'react'
import '../assets/scss/UserDetails.scss'

const capitalize = (word) => {
  if(word){
    return word[0].toUpperCase()+word.slice(1)
  }
  else{
    return null
  }
}

const UserDetails = props => {
  let {user} = props
  return (
    <React.Fragment>
      <div className="user-details">
        <h1>{user.name}</h1>
        <p>Age {user.age}</p>
        <p>{capitalize(user.proficiency)} Hiker</p>
        {user.coords ? <p>Home Latitude:{user.coords.lat} || Home Longitude:{user.coords.lng}</p>:null}
      </div>
    </React.Fragment>
  )
}

export default UserDetails
