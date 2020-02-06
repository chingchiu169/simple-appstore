import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, ListGroupItem } from 'reactstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Truncate from 'react-truncate';

const Recommendation = ({ index, name, artworkUrl100, genres, onClick }) => {
  useEffect(() => {
    document.getElementById(index + "recommendlistitem").classList.add('list-item-ani-enter-active')
  });
  return (
    <ListGroupItem id={index + "recommendlistitem"} className="list-item list-item-ani-enter" onClick={onClick}>
      <Row>
        <Col>
          <LazyLoadImage
            src={artworkUrl100}
            alt={artworkUrl100}
            effect="opacity"
            width={80}
            threshold={80}
          />
        </Col>
      </Row >
      <Row>
        <Col className="item-name">
          <Truncate
            line={1}
            trimWhitespace
          >
            {name}
          </Truncate>
        </Col>
      </Row>
      <Row>
        <Col className="item-category">
          {
            genres[0].name
          }
        </Col>
      </Row>
    </ListGroupItem >
  )
}
Recommendation.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
}

export default Recommendation