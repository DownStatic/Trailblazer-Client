import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../assets/scss/TrailView.scss'

const mapkey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"
const trailkey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"
const Comments = "http://localhost:3000/api/v1/comments"
const Landmarks = "http://localhost:3000/api/v1/landmarks"

export class TrailView extends PureComponent {

  state = {
    trail: {},
    comments: [],
    landmarks: [],
    protoComment: "",
    protoLandmarkText: "",
    protoLandmarkURL: "",
    display: "default"
  }

  componentWillMount(){
    console.log("component is mounting...");
    fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=${trailkey}`)
    .then(res => res.json())
    .then(trails => this.setState({trail: trails.trails[0]}))
    fetch(Comments)
    .then(res => res.json())
    .then(comments => {
      let filtered = comments.filter(c => c.trail_id === Number(this.props.match.params.id))
      this.setState({comments: filtered})
    })
    fetch(Landmarks)
    .then(res => res.json())
    .then(landmarks => {
      let filtered = landmarks.filter(l => l.trail_id === Number(this.props.match.params.id))
      this.setState({landmarks: filtered})
    })
  }

  renderComments = () => {
    if(this.state.comments.length){
      return(
        this.state.comments.map(c => {
          return <p key={200+c.id}>{c.text}</p>
        })
      )
    }
    else{
      return <p>No comments for this trail!</p>
    }
  }

  renderCommentForm = () => {
    return (
      <div>
        <input name="protoComment" placeholder="new comment text" type="text" className="comment-form" onChange={this.stageText}></input>
        <button className="comment-add" onClick={this.addComment}>Add Comment</button>
      </div>
    )
  }

  renderLandmarks = () => {
    if(this.state.landmarks.length){
      return(
        this.state.landmarks.map(l => {
          return (
            <React.Fragment key={400+l.id}>
              <img className="landmark-image" src={l.image_url} alt={l.id} />
              <p>{l.details}</p>
            </React.Fragment>
          )
        })
      )
    }
  }

  renderLandmarkForm = () => {
    return (
      <div className="landmark-form">
        <p>Landmark Form goes here.</p>
        <input name="protoLandmarkText" placeholder="new landmark description" type="text" className="comment-form" onChange={this.stageText}></input><br></br>
        <label>Landmark</label>
        <input onChange={this.landmarkUpload} name="landmark" id="landmark_file" type="file" accept="image/*"></input><br></br>
        {this.state.protoLandmarkURL ? <img src={this.state.protoLandmarkURL} alt="questionable" className="proto-landmark" /> : null}
        <button className="landmark-add" onClick={this.addLandmark}>Add Landmark</button>
      </div>
    )
  }

  landmarkUpload = (event) => {
    this.setState({protoLandmarkURL: URL.createObjectURL(event.target.files[0])})
  }

  addLandmark = () => {
    let landmark_image = document.getElementById("landmark_file").files[0]
    let form_upload = new FormData()
    form_upload.append("image", landmark_image)
    let landmark = {details: this.state.protoLandmarkText, user_id: this.props.user_id, trail_id: this.props.match.params.id}
    form_upload.append("landmark", JSON.stringify(landmark))
    fetch(Landmarks, {
      method: "POST",
      headers: {'Authorization': `Bearer ${this.props.jwt}`},
      body: form_upload
    }).then(res => res.json()).then(json => console.log(json))
  }

  stageText = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  addComment = () => {
    fetch(Comments, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.props.jwt}`
        },
      body: JSON.stringify({
        comment: {
          text: this.state.protoComment,
          user_id: this.props.user_id,
          trail_id: this.state.trail.id
        }
      })
    }).then(res => res.json()).then(comment => {
      this.setState(currentState => {
        let newcomments = currentState.comments
        newcomments.push(comment)
        return {
          comments: newcomments,
          display: "comments"
        }
      })
    })
  }

  showComments = () => {
    this.setState({display: "comments"})
  }

  showLandmarks = () => {
    this.setState({display: "landmarks"})
  }

  commentForm = () => {
    this.setState({display: "comment-form"})
  }

  landmarkForm = () => {
    this.setState({display: "landmark-form"})
  }

  defaultView = () => {
    this.setState({display: "default"})
  }

  displayNav = () => {
    return (
      <div className="display-nav">
        <button onClick={this.defaultView}>Trail Info</button>
        <button onClick={this.showComments}>View Comments</button>
        <button onClick={this.showLandmarks}>View Landmarks</button>
        <button onClick={this.commentForm}>Add a Comment</button>
        <button onClick={this.landmarkForm}>Add a Landmark</button>
      </div>
    )
  }

  renderDisplay = () => {
    switch(this.state.display){
      case "comments":
        return this.renderComments()
      case "landmarks":
        return this.renderLandmarks()
      case "comment-form":
        return this.renderCommentForm()
      case "landmark-form":
        return this.renderLandmarkForm()
      default:
        return <p>Default display. Select a comment or landmark action below</p>
    }
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
            zoomControl={false}
            mapType={"satellite"}>

          </Map>
        </div>
        <div className="display-area">
          {this.renderDisplay()}
          {this.displayNav()}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {user_id: state.user.id, jwt: state.jwt}
}

export default GoogleApiWrapper({
  apiKey: mapkey
})(connect(mapStateToProps)(TrailView))
