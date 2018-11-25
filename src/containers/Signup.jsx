import React, { PureComponent } from 'react'

export default class Signup extends PureComponent {

  state = {
    username: "",
    password: "",
    age: 0,
    proficiency: "beginner",
    address: {}
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

  proficiencySelect = () => {
    return(
      <select onChange={this.handleChange} name="proficiency">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="advanced">advanced</option>
      </select>
    )
  }

  render(){
    return(
      <div>
        <label>Username</label><br></br>
        <input onChange={this.handleChange} name="username" type="text" placeholder="your username"></input><br></br>
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
        <button onClick={this.createUser}>Submit</button>
      </div>
    )
  }

}
