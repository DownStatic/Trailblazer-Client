import React, { PureComponent } from 'react'
import {GoogleApiWrapper} from 'google-maps-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../assets/scss/Signup.scss'

const geokey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"

export class Signup extends PureComponent {

  state = {
    name: "",
    password: "",
    age: 0,
    proficiency: "beginner",
    address: {},
    avatar: null
  }

  handleChange = (event) => {
    let key = event.target.name
    this.setState({
      [key]: event.target.value
    })
  }

  handleAddress = (event) => {
    let key = event.target.name
    let val = event.target.value
    this.setState((currentState) => {
      return {
      address: {...currentState.address,
        [key]: val}
    }})
  }

  handleSubmit = (coords) => {
    let avatar = document.getElementById("avatar_file").files[0]
    let form_upload = new FormData()
    form_upload.append("avatar", avatar)
    let not_avatar = {...this.state}
    delete not_avatar["avatar"]
    form_upload.append("user", JSON.stringify(not_avatar))
    form_upload.append("coords", JSON.stringify(coords))
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      body: form_upload
    }).then(res => res.json()).then(newuser => {
      window.localStorage.setItem('token', newuser.jwt)
      this.props.dispatch({type: "SUCCESSFUL_LOGIN", user: newuser.user})
    })
  }

  proficiencySelect = () => {
    return(
      <select onChange={this.handleChange} name="proficiency">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="advanced">advanced</option>
      </select>
    )
  }

  avatarUpload = (event) => {
    this.setState({avatar: URL.createObjectURL(event.target.files[0])})
  }

  locate = () => {
    let geocoder = new this.props.google.maps.Geocoder()
    let { street_address, city, state, zip_code } = this.state.address
    let address = [street_address,city,state].join(",")+zip_code
    geocoder.geocode({address: address}, (response, status) => {
      let coords = { lat: response[0].geometry.location.lat(),lng: response[0].geometry.location.lng()}
      this.handleSubmit(coords)
    })
  }

  render(){
    if(this.props.logged_in){
      return <Redirect to='/Profile' />
    }

    return(

      <div className="user_creation">
        <div className="avatar_portion">
          <label>Avatar</label>
          <input onChange={this.avatarUpload} name="avatar" id="avatar_file" type="file" accept="image/*"></input><br></br>
          <img src={this.state.avatar ? this.state.avatar : "https://i.imgur.com/B4Unr42.png"} alt="questionable" />
        </div>
        <div className="user_details">
          <label>Username</label><br></br>
          <input onChange={this.handleChange} name="name" type="text" placeholder="your username"></input><br></br>
          <label>Password</label><br></br>
          <input onChange={this.handleChange} name="password" type="password" placeholder="your password"></input><br></br>
          <label>Age</label><br></br>
          <input onChange={this.handleChange} name="age" type="number"></input><br></br>
          <label>Select Your Proficiency</label><br></br>
          {this.proficiencySelect()}<br></br>
          <label>Street Address</label><br></br>
          <input onChange={this.handleAddress} name="street_address" type="text"></input><br></br>
          <label>City</label><br></br>
          <input onChange={this.handleAddress} name="city" type="text"></input><br></br>
          <label>State</label><br></br>
          <input onChange={this.handleAddress} name="state" type="text"></input><br></br>
          <label>Zip Code</label><br></br>
          <input onChange={this.handleAddress} name="zip_code" type="number"></input><br></br>
          <button onClick={this.locate}>Submit</button><br></br>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { logged_in: state.logged_in }
}

export default GoogleApiWrapper({
  apiKey: geokey
})(connect(mapStateToProps)(Signup))
