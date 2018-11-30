import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/RecommendationBox.scss'

export class RecommendationBox extends PureComponent {

  recCard = (rec) => {
    return(
      <div className="movie_card" key={rec.id}>
        <div className="info_section">
          <div className="movie_header">
            <h1>{rec.name}</h1>
          </div>
          <div class="movie_desc">
            <p class="text">
              {rec.summary}
            </p>
          </div>
        </div>
        <div className="blur_back bright_back" style={{backgroundImage:`url(${rec.imgMedium})`}}></div>
      </div>
    )
  }

  render(){
    let { recommendations } = this.props
    console.log(recommendations);

    return(
      <div className="recommendations-container">
        {recommendations ? recommendations.map(rec => this.recCard(rec)) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { recommendations: state.recommendations }
}

export default connect(mapStateToProps)(RecommendationBox)
