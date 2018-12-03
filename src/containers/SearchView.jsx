import React, { PureComponent } from 'react'
import '../assets/scss/SearchView.scss'
import { Link } from 'react-router-dom'
import RecommendationBox from '../components/RecommendationBox'

const trailKey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"

export default class SearchView extends PureComponent {

  state = {
    latitude: 0,
    longitude: 0,
    range: 0,
    searching: true,
    trails: []
  }

  updateCoordinates = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  searchTrails = () => {
    let {latitude, longitude, range} = this.state
    let target = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=${range}&key=${trailKey}`
    fetch(target).then(res=>res.json()).then(trails=>this.setState({trails:trails.trails, searching: false}))
  }

  switchDisplay = () => {
    this.setState({searching: true})
  }

  searchField = () => {
    return (
      <div className="search-form">
        <label>Latitude</label><br></br>
        <input name="latitude" type="number" onChange={this.updateCoordinates} placeholder="latitude"></input><br></br>
        <label>Longitude</label><br></br>
        <input name="longitude" type="number" onChange={this.updateCoordinates} placeholder="longitude"></input><br></br>
        <label>Search Radius</label><br></br>
        <input name="range" type="number" onChange={this.updateCoordinates} placeholder="range (miles)"></input><br></br>
        <button onClick={this.searchTrails}>Search Trails</button>
      </div>
    )
  }

  displayField = () => {
    return (
      <React.Fragment>
        <div className="display-field">
          {this.state.trails.map(trail=>{
            return(
              <div key={trail.id} className="flex-child">
                <Link to={`/Trail/${trail.id}`}>
                  <div className="movie_card">
                    <div className="info_section">
                      <div className="movie_header">
                        <h1>{trail.name}</h1>
                      </div>
                      <div className="movie_desc">
                        <p className="text">
                          {trail.summary}
                        </p>
                      </div>
                    </div>
                    <div className="blur_back bright_back" style={{backgroundImage:`url(${trail.imgMedium})`}}></div>
                  </div>
                </Link>
              </div>
            )
          })}
          <button onClick={this.switchDisplay}>Search Again</button>
        </div>
        <RecommendationBox />
      </React.Fragment>
    )
  }

  render(){
    return (
      <div>
        {this.state.searching ? this.searchField() : this.displayField()}
      </div>
    )
  }
}
