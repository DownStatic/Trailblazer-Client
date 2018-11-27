import React, { PureComponent } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../assets/scss/TrailView.scss'

const mapkey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"
const trailkey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"

export class TrailView extends PureComponent {

  state = {
    trail: {}
  }

  componentWillMount(){
    fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=${trailkey}`)
    .then(res => res.json())
    .then(trails => this.setState({trail: trails.trails[0]}))
  }

  render(){
    return(
      <div className="map-container">
        <Map
          className="trail-map"
          google={this.props.google}
          center={{lat:this.state.trail.latitude,lng:this.state.trail.longitude}}
          zoom={14}>

        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: mapkey
})(TrailView)
