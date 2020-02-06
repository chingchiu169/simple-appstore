import React from 'react'
import PropTypes from 'prop-types'
import Application from './Application'
import { ListGroup } from 'reactstrap'
import LazyLoad from 'react-lazyload';

const ApplicationList = ({ applications, onClick }) => (
  <ListGroup className="list">
    {
      applications.map((application, index) => (
        <LazyLoad key={index} overflow throttle={84} height={84}>
          <Application {...application} index={index} onClick={() => onClick(application)} />
        </LazyLoad>
      ))
    }
  </ListGroup >
)

ApplicationList.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      genres: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
}
export default ApplicationList