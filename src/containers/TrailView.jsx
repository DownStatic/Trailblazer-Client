import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../assets/scss/TrailView.scss'

const mapkey = "AIzaSyA6JCWe4O5FRl56_Y5nKuoqC_U1nNXWVvs"
const trailkey = "200389058-ca4e48fd0274137a0e4e2693a51308cc"
const Comments = "http://localhost:3000/api/v1/comments"
const Landmarks = "http://localhost:3000/api/v1/landmarks"
const Dart = "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Bubble-Chartreuse-icon.png"
const BlueDart = "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Azure-icon.png"
const Pin = "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Inside-Chartreuse-icon.png"
const LeftArrow = "https://i.imgur.com/mOrGXpY.png"
const RightArrow = "https://i.imgur.com/VJu0oPx.png"

export class TrailView extends PureComponent {

  state = {
    trail: {},
    comments: [],
    landmarks: [],
    selectedLandmark: {},
    protoComment: "",
    protoLandmarkText: "",
    protoLandmarkURL: "",
    protoLandmarkCoords: {},
    display: "default",
    fading:"fade-in"
  }

  componentWillMount(){
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
        <div className="comments-container">
          <p className="landmark-title-text">Trail Comments</p>
          {this.state.comments.map(c => {
            return <p className="individual-comment" key={200+c.id}>{c.text}<br></br>-{c.user}</p>
          })}
        </div>
      )
    }
    else{
      return <p>No comments for this trail!</p>
    }
  }

  renderCommentForm = () => {
    return (
      <div className="trails-form">
        <div className="trails-inputs-container">
          <input name="protoComment" placeholder="new comment text" type="text" className="comment-form" onChange={this.stageText}></input>
          <button className="comment-add" onClick={this.addComment}>Add Comment</button>
        </div>
      </div>
    )
  }

  cycleLandmark = (event) => {
    let {landmarks, selectedLandmark} = this.state
    let ref = landmarks.indexOf(selectedLandmark)
    if(event.target.alt === "prev" || event.target.className.includes("prev")){
      if(ref===0){
        this.setState({fading: "fade-out"}, () => {
          setTimeout(this.setState({fading: "fade-in", selectedLandmark: landmarks[landmarks.length-1]}), 300)})
      }
      else{
        this.setState({fading: "fade-out"}, () => {
          setTimeout(this.setState({fading: "fade-in", selectedLandmark: landmarks[ref-1]}), 300)})
      }
    }
    else if (event.target.alt === "next" || event.target.className.includes("next")){
      if(ref===landmarks.length-1){
        this.setState({fading: "fade-out"}, () => {
          setTimeout(this.setState({fading: "fade-in", selectedLandmark: landmarks[0]}), 300)})
      }
      else{
        this.setState({fading: "fade-out"}, () => {
          setTimeout(this.setState({fading: "fade-in", selectedLandmark: landmarks[ref+1]}), 300)})
      }
    }
  }



  renderLandmarks = () => {
    if(this.state.selectedLandmark){
      return(
        <React.Fragment key={400+this.state.selectedLandmark.id}>
          <div className="landmark-nav prev" onClick={this.cycleLandmark}>
            <img className="arrows" src={LeftArrow} alt="prev" />
          </div>
          <div className="landmark-nav next" onClick={this.cycleLandmark}>
            <img className="arrows" src={RightArrow} alt="next" />
          </div>
          <div className="movie_card">
            <img className={`blur_back bright_back landmark-image ${this.state.fading}`} src={this.state.selectedLandmark.image_url}></img>
          </div>
          <center><p className="landmark-summary">{this.state.selectedLandmark.details}<br></br>Posted by:{this.state.selectedLandmark.user}</p></center>
        </React.Fragment>
      )
    }
    else{
      return <p>No landmarks for this trail!</p>
    }
  }

  renderLandmarkForm = () => {
    let {protoLandmarkURL, protoLandmarkCoords} = this.state
    return (
      <div className="trails-form">
        <div className="trails-inputs-container">
          <p className="landmark-title-text">-Click the map to specify a location, and upload an image before submitting-</p>
          <input name="protoLandmarkText" placeholder="new landmark description" type="text" className="comment-form" onChange={this.stageText}></input><br></br>
          <p className="form-latlon">Latitude:{protoLandmarkCoords.lat} || Longitude:{protoLandmarkCoords.lng}</p>
          <input onChange={this.landmarkUpload} name="landmark" id="landmark_file" type="file" accept="image/*"></input><br></br>
          {protoLandmarkURL ? <img src={protoLandmarkURL} alt="questionable" className="proto-landmark" /> : null}
          <button className="landmark-add" onClick={this.addLandmark}>Add Landmark</button>
        </div>
      </div>
    )
  }

  landmarkUpload = (event) => {
    this.setState({protoLandmarkURL: URL.createObjectURL(event.target.files[0])})
  }

  addLandmark = () => {
    let landmark_image = document.getElementById("landmark_file").files[0]
    if(!landmark_image || !this.state.protoLandmarkCoords.lat){
      alert("Coordinates and an image are required to create a new landmark")
      return null
    }
    let form_upload = new FormData()
    form_upload.append("image", landmark_image)
    let landmark = {details: this.state.protoLandmarkText, user_id: this.props.user_id, trail_id: this.props.match.params.id, coords: this.state.protoLandmarkCoords}
    form_upload.append("landmark", JSON.stringify(landmark))
    fetch(Landmarks, {
      method: "POST",
      headers: {'Authorization': `Bearer ${this.props.jwt}`},
      body: form_upload
    }).then(res => res.json()).then(newlandmark => {
      this.setState(currentState => {
        let newlandmarks = currentState.landmarks
        newlandmarks.push(newlandmark)
        return {
          landmarks: newlandmarks,
          display: "landmarks",
          selectedLandmark: newlandmark
        }
      })
    })
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
    this.setState({display: "landmarks", selectedLandmark: this.state.landmarks[0]})
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
        {this.props.logged_in ? <button onClick={this.commentForm}>Add a Comment</button> : null}
        {this.props.logged_in ? <button onClick={this.landmarkForm}>Add a Landmark</button> : null}
      </div>
    )
  }

  trailInfo = () => {
    let {trail} = this.state
    return(
      <div>
        <p className="trail-title">{trail.name}</p>
        <p className="trail-summary">
          {trail.summary}<br></br><br></br>
          Difficulty: {this.convertDifficulty(trail.difficulty)}/5 || Length: {trail.length} miles<br></br>
          Current Conditions: {trail.conditionStatus} (updated {trail.conditionDate})
        </p>
        <div className="movie_card">
          <img className={`blur_back bright_back landmark-image`} src={trail.imgMedium}></img>
        </div>
      </div>
    )
  }

  convertDifficulty = (difficulty) => {
    switch(difficulty){
      case "green":
        return 1
      case "greenBlue":
        return 2
      case "blue":
        return 3
      case "blueBlack":
        return 4
      case "black":
        return 5
      default:
        return "unknown"
    }
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
        return this.trailInfo()
    }
  }

  handleMapClick = (mapProps, map, clickEvent) => {
    if(this.props.logged_in){
      let protoCoords = {lat: clickEvent.latLng.lat(),lng: clickEvent.latLng.lng()}
      this.setState({protoLandmarkCoords: protoCoords, display: "landmark-form"})
    }
  }

  handleMarkerClick = (event) => {
    let clickedLandmark = this.state.landmarks.filter(l => l.coords === event.position)[0]
    this.setState({selectedLandmark: clickedLandmark, display: "landmarks"})
  }

  render(){
    let {google} = this.props
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
            onClick={this.handleMapClick}
            mapType={"satellite"}>
            {this.state.landmarks.length ? this.state.landmarks.map(landmark => {
              return <Marker position={landmark.coords} onClick={this.handleMarkerClick} icon={landmark.id === this.state.selectedLandmark.id ? BlueDart : Dart} key={landmark.id+950} />
            }) : null}
            {this.state.protoLandmarkCoords.lat ? <Marker position={this.state.protoLandmarkCoords} animation={google.maps.Animation.DROP} icon={Pin}/>: null}

          </Map>
        </div>
        <div className="display-area">
          {this.renderDisplay()}
        </div>
        {this.displayNav()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {user_id: state.user.id, jwt: state.jwt, logged_in: state.logged_in}
}

export default GoogleApiWrapper({
  apiKey: mapkey
})(connect(mapStateToProps)(TrailView))
