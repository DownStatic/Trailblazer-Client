import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import '../assets/scss/RecommendationBox.scss'

export class RecommendationBox extends PureComponent {

  recCard = (rec) => {
    return(
      <Link key={rec.id} to={`/Trail/${rec.id}`}>
        <div className="movie_card">
          <div className="info_section">
            <div className="movie_header">
              <h1>{rec.name}</h1>
            </div>
            <div className="movie_desc">
              <p className="text">
                {rec.summary}
              </p>
            </div>
          </div>
          <div className="blur_back bright_back" style={{backgroundImage:`url(${rec.imgMedium})`}}></div>
        </div>
      </Link>
    )
  }

  render(){
    let { recommendations } = this.props

    return(
      <div className="recommendations-container">
        <div className="title-container">
          <p className="recommendation-title">TrailBlazer Recommendations</p>
        </div>
        {recommendations ? recommendations.map(rec => this.recCard(rec)) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { recommendations: state.recommendations }
}

export default connect(mapStateToProps)(RecommendationBox)
