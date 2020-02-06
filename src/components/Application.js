import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, ListGroupItem } from 'reactstrap'

const Application = ({ index, onClick, name, artistName, artworkUrl100, genres }) => {
  useEffect(() => {
    document.getElementById(index + "applscationlistitem").classList.add('list-item-ani-enter-active')
  });
  return (
    <ListGroupItem id={index + "applscationlistitem"} className="list-item list-item-ani-enter" onClick={onClick}>
      <Row>
        <Col className="text-center number" xs="1">
          {index + 1}
        </Col>
        <Col>
          <Row>
            <Col xs="3" className="text-center">
              <img className={index % 2 === 1 ? "round" : "circle"} src={artworkUrl100} alt={artworkUrl100} />
            </Col>
            <Col>
              <Row>
                <Col className="item-name">
                  {name}
                </Col>
              </Row>
              <Row>
                <Col className="item-artist-name">
                  {artistName}
                </Col>
              </Row>
              <Row>
                <Col className="item-category">
                  {genres[0].name}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  )
}
Application.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
}
export default Application