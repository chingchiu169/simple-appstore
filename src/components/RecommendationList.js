import React from 'react'
import PropTypes from 'prop-types'
import Recommendation from './Recommendation'
import { ListGroup } from 'reactstrap'
import LazyLoad from 'react-lazyload';

const RecommendationList = ({ type, applications, onClick }) => (
  <ListGroup id="RecommandationList" horizontal={type === 1 ? true : false} className="list" >
    {
      applications.map((application, index) => (
        <LazyLoad key={index} overflow throttle={84} height={84}>
          <Recommendation {...application} key={index} index={index} onClick={() => onClick(application)} />
        </LazyLoad>
      ))
    }
  </ListGroup>
)

RecommendationList.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      genres: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
}
export default RecommendationList