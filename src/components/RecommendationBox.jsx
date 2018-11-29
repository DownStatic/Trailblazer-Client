import React from 'react'
import { connect } from 'react-redux'
import '../assets/scss/RecommendationBox.scss'

const RecommendationBox = (props) => {
  let {recommendations} = props.recommendations
  console.log(recommendations);
  return(
    <div className="recommendations-container">
      {recommendations ? recommendations.map(rec => <p key={rec.id}>{rec.name}</p>) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return { recommendations: state.recommendations }
}

export default connect(mapStateToProps)(RecommendationBox)
