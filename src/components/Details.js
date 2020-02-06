import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, ModalBody, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Truncate from 'react-truncate';
import Rating from 'react-rating'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons'

const Details = ({ application, t }) => {
  const [truncate, setTruncate] = useState(true);
  if (!(Object.keys(application).length === 0 && application.constructor === Object)) {
    return (
      <ModalBody className="details-modal">
        <Row className="basic">
          <Col xs="4">
            <LazyLoadImage
              src={application.artworkUrl100}
              alt={application.artworkUrl100}
              effect="opacity"
              width={100}
              threshold={100}
              className="circle"
            />
          </Col>
          <Col>
            <Row>
              <Col className="name">
                {application.trackName} {` `} <span className="rate">{application.trackContentRating}</span>
              </Col>
            </Row>
            <Row>
              <Col className="seller-name">
                {application.sellerName}
              </Col>
            </Row>
            <Row>
              <Col className="rating">
                <Rating
                  emptySymbol={<FontAwesomeIcon icon={faStarO} fixedWidth style={{ color: "#cccccc" }} />}
                  fullSymbol={<FontAwesomeIcon icon={faStar} fixedWidth style={{ color: "#ffdf00" }} />}
                  fractions={2}
                  initialRating={application.averageUserRating}
                  className="rating-star"
                  readonly
                />
                <span className="rating-star-text">{` `} {application.averageUserRating} {`,`} {application.userRatingCount} {t('Rating')}</span>
              </Col>
            </Row>
            <Row>
              <Col className="price">
                {application.formattedPrice}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="screenshots">
          <Col className="screenshots-col">
            <ListGroup horizontal className="screenshots-list">
              {
                application.screenshotUrls.map((value, index) => {
                  return (
                    <ListGroupItem className="screenshots-list-item" key={index}>
                      <LazyLoadImage
                        src={value}
                        alt={value}
                        effect="opacity"
                        width={200}
                        threshold={200}
                        delayTime={5000}
                      />
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
          </Col>
        </Row>
        <Row className="description">
          <Col>
            {
              truncate &&
              (
                <Truncate lines={6}>
                  {application.description.split('\n').map((line, i, arr) => {
                    line = <span key={i}>{line}</span>;
                    if (i === arr.length - 1) {
                      return line;
                    } else {
                      return [line, <br key={i + 'br'} />];
                    }
                  })}
                </Truncate>
              )
            }
            {
              !truncate &&
              (
                application.description.split('\n').map((line, i, arr) => {
                  line = <span key={i}>{line}</span>;
                  if (i === arr.length - 1) {
                    return line;
                  } else {
                    return [line, <br key={i + 'br'} />];
                  }
                })
              )
            }
            <div className="text-right">
              <Button className="read-more-btn" size="sm" color="link" onClick={() => setTruncate(!truncate)}>{truncate ? t('Read more') : t('Show less')}</Button>
            </div>
          </Col>
        </Row>
        <Row className="infomation">
          <Col>
            <Row>
              <Col xs="2">
                {t('Seller')}
              </Col>
              <Col>
                {application.sellerName}
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                {t('Size')}
              </Col>
              <Col>
                {(application.fileSizeBytes / 1000 / 1000).toFixed(1)} MB
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                {t('Category')}
              </Col>
              <Col>
                {application.genres[0]}
              </Col>
            </Row>
            <Row>
              <Col xs="2">
                {t('Price')}
              </Col>
              <Col>
                {application.formattedPrice}
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    )
  }
  else {
    return null
  }
}

Details.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
      trackContentRating: PropTypes.string.isRequired,
      sellerName: PropTypes.string.isRequired,
      averageUserRating: PropTypes.string.isRequired,
      userRatingCount: PropTypes.string.isRequired,
      formattedPrice: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fileSizeBytes: PropTypes.number.isRequired,
      screenshotUrls: PropTypes.array.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      genres: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
}

Details.propTypes = {

}

export default withTranslation()(Details)