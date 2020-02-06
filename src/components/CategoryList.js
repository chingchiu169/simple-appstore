import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { withTranslation } from 'react-i18next'

const CategoryList = ({ categories, onClick, t }) => (
  <ListGroup horizontal className="list text-center">
    <ListGroupItem className="list-item" onClick={() => onClick("")}>
      {t('All')}
      </ListGroupItem>
    {
      categories.map((category, index) => (
        <ListGroupItem className="list-item" onClick={() => onClick(category.genreId)} key={index}>
          {t(category.name)}
        </ListGroupItem>
      ))
    }
  </ListGroup>
)

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      genreId: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}
export default withTranslation()(CategoryList)