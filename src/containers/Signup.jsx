import React, { PureComponent } from 'react'
import '../assets/scss/Signup.scss'

export default class Signup extends PureComponent {

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

  handleSubmit = () => {
    let avatar = document.getElementById("avatar_file").files[0]
    let form_upload = new FormData()
    form_upload.append("avatar", avatar)
    let not_avatar = {...this.state}
    delete not_avatar["avatar"]
    form_upload.append("user", JSON.stringify(not_avatar))
    console.log(not_avatar);
    fetch('http://localhost:3000/api/v1/users', {
      method: "POST",
      body: form_upload
    }).then(res => res.json()).then(json => console.log(json))
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

  render(){
    return(
      <div className="user_creation">
        <div className="avatar_portion">
          <label>Avatar</label>
          <input onChange={this.avatarUpload} name="avatar" id="avatar_file" type="file" accept="image/*"></input><br></br>
          <img src={this.state.avatar ? this.state.avatar : "https://is3-ssl.mzstatic.com/image/thumb/Purple91/v4/f6/9f/62/f69f62cc-ccf2-cc72-b7f2-5ba8233d9ed9/source/256x256bb.jpg"} alt="questionable" />
        </div>
        <div className="user_details">
          <label>Username</label><br></br>
          <input onChange={this.handleChange} name="name" type="text" placeholder="your username"></input><br></br>
          <label>Password</label><br></br>
          <input onChange={this.handleChange} name="password" type="text" placeholder="your password"></input><br></br>
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
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }

}
