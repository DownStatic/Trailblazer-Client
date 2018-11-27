import React, { PureComponent } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../assets/scss/TrailView.scss'

const mapkey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"
const trailkey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"

export class TrailView extends PureComponent {

  state = {
    trail: {},
    comments: []
  }

  componentWillMount(){
    fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=${trailkey}`)
    .then(res => res.json())
    .then(trails => this.setState({trail: trails.trails[0]}))
    fetch('http://localhost:3000/api/v1/comments')
    .then(res => res.json())
    .then(comments => {
      let filtered = comments.filter(c => c.trail_id === Number(this.props.match.params.id))
      this.setState({comments: filtered})
    })
  }

  renderComments = () => {
    return(
      this.state.comments.map(c => {
        return <p key={200+c.id}>{c.text}</p>
      })
    )
  }

  render(){
    return(
      <React.Fragment>
        <div className="map-container">
          <Map
            className="trail-map"
            google={this.props.google}
            center={{lat:this.state.trail.latitude,lng:this.state.trail.longitude}}
            zoom={14}
            disableDefaultUI={true}
            draggable={false}
            zoomControl={false}>

          </Map>
        </div>
        <div className="display-area">
          {this.state.comments.length ? this.renderComments() : <p>No comments for this trail!</p>}
        </div>
      </React.Fragment>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: mapkey
})(TrailView)
