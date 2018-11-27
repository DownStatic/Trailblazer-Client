import React, { PureComponent } from 'react'

const mapkey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"

export default class TrailView extends PureComponent {

state = {
  trailhead: {
    latitude: 40,
    longitude: -70
  }
}

  render(){
    return (
      <div>
      <p>This is the trail view.</p>
    </div>
  )}
}
