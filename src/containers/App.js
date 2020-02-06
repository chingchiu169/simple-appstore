import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchAllNow, showingApplications, showApplicationDetails, closeApplicationDetails, searchApplications, scrolling, showingCategory } from '../actions'
import { Container, Row, Col, Form, Input, Modal, Button } from 'reactstrap'
import { Loader } from 'react-overlay-loader';
import { withTranslation } from 'react-i18next'
import RecommendationList from '../components/RecommendationList'
import ApplcationList from '../components/ApplicationList'
import Details from '../components/Details'
import CategoryList from '../components/CategoryList';

class App extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchAllNow())
  }
  componentWillUnmount = () => {
    document.getElementById('ApplcationList').removeEventListener("scroll", this.handleScrollToBottom)
  }
  componentDidUpdate = () => {
    var ApplcationListDiv = document.getElementById('ApplcationList')
    if (ApplcationListDiv) {
      ApplcationListDiv.addEventListener("scroll", this.handleScrollToBottom)
    }
  }
  handleScrollToBottom = () => {
    const { dispatch, showingApplications: showApplicationsArray, showingPage, position, category } = this.props
    const div = document.getElementById('ApplcationList')
    const divHeight = div.scrollTop
    const divBottom = div.scrollHeight - div.offsetHeight
    if (divHeight - divBottom > -50) {
      if (showApplicationsArray.length < 100 && category === "") {
        dispatch(showingApplications(showingPage + 1))
      }
    }
    const divRecommandation = document.getElementById('RecommandationList')
    if (divHeight > position) {
      divRecommandation.scrollLeft += 20
    }
    else {
      divRecommandation.scrollLeft -= 20
    }
    dispatch(scrolling(divHeight));
  }
  searchApps = (event) => {
    const { dispatch } = this.props
    dispatch(searchApplications(event.target.value))
  }
  showApplicationDetails = (application) => {
    const { dispatch } = this.props
    dispatch(showApplicationDetails(application))
  }
  closeApplicationDetails = () => {
    const { dispatch } = this.props
    dispatch(closeApplicationDetails())
  }
  handleCategory = (categoryID) => {
    const div = document.getElementById('ApplcationList')
    div.scrollTop = 0
    const { dispatch, category } = this.props
    if (categoryID === category) {
      return
    }
    dispatch(showingCategory(categoryID))
    if (categoryID === "") {
      dispatch(showingApplications(0))
    }
  }
  flatten = (array, mutable) => {
    var toString = Object.prototype.toString;
    var arrayTypeStr = '[object Array]';
    var result = [];
    var nodes = (mutable && array) || array.slice();
    var node;
    if (!array.length) {
      return result;
    }
    node = nodes.pop();
    do {
      if (toString.call(node) === arrayTypeStr) {
        nodes.push.apply(nodes, node);
      } else {
        result.push(node);
      }
    } while (nodes.length && (node = nodes.pop()) !== undefined);
    result.reverse(); // we reverse result to restore the original order
    return result;
  }
  setLang = (lang) => {
    this.props.i18n.changeLanguage(lang)
    // window.localStorage.setItem('i18nextLng', lang)
  }
  render() {
    const {
      search,
      searchResult,
      // recommendation,
      recommendations,
      application,
      applications,
      showingApplications,
      // showingPage,
      detailsModal,
      requestingDetails,
      requestingRecommendations,
      requestingApplications,
      // position
      t,
    } = this.props
    var category = applications.map((value) => value.genres)
    category = this.flatten(category, false)
    category = category.reduce((acc, current) => {
      const x = acc.find(item => item.genreId === current.genreId);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return (
      <>
        <Container id="container">
          {
            (requestingRecommendations || requestingApplications) && <Loader fullPage loading text={t('Loading')} />
          }
          {!requestingRecommendations && !requestingApplications && showingApplications.length === 0 && <h2>Empty.</h2>}
          <div>
            {
              !requestingRecommendations && !requestingApplications && showingApplications.length > 0 &&
              <>
                <Row className="search">
                  <Col id="searchCol" className="search-col" style={{ maxWidth: document.getElementById('container').offsetWidth }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                      <Input bsSize="sm" type="text" name="text" id="search" placeholder={t('Search')} onChange={this.searchApps} className="search-input" />
                    </Form>
                  </Col>
                </Row>
                {
                  searchResult.length > 0 && search !== '' &&
                  <Row className="searchlist">
                    <Col>
                      <ApplcationList applications={searchResult} onClick={this.showApplicationDetails} />
                    </Col>
                  </Row>
                }
                {
                  searchResult.length === 0 && search !== '' &&
                  <Row className="noResult">
                    <Col>
                      {t('No result...')}
                    </Col>
                  </Row>
                }
                {
                  searchResult.length === 0 && search === '' &&
                  <>
                    <Row className="recommandationLabel">
                      <Col>
                        {t('Recommendation')}
                      </Col>
                    </Row>
                    <Row className="recommandation">
                      <Col>
                        <RecommendationList type={1} applications={recommendations} onClick={this.showApplicationDetails} />
                      </Col>
                    </Row>
                    <Row id="CategoryList" className="categorylist">
                      <Col>
                        <CategoryList categories={category} onClick={this.handleCategory} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {t('Application List')}
                      </Col>
                    </Row>
                    <Row id="ApplcationList" className="applcationlist">
                      <Col>
                        <ApplcationList applications={showingApplications} onClick={this.showApplicationDetails} />
                      </Col>
                    </Row>
                  </>
                }
                <Row className="footer">
                  <Col className="text-center">
                    <Row>
                      <Col>
                        <img alt="..." src={require("../asserts/img/locales/en.svg")} onClick={() => this.setLang('en')} />
                        <img alt="..." src={require("../asserts/img/locales/tc.svg")} onClick={() => this.setLang('tc')} />
                        <img alt="..." src={require("../asserts/img/locales/cn.svg")} onClick={() => this.setLang('cn')} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>@ 2020 <a href="https://davidchiu.work">DavidChiu.work</a></Col>
                    </Row>
                  </Col>
                </Row>
              </>
            }
          </div>
        </Container>
        <Modal
          isOpen={detailsModal}
          backdrop={true}
          centered={true}
          className="details-modal"
        >
          <Details application={application} />
          <Button color="link" onClick={this.closeApplicationDetails}>{t('Close')}</Button>
        </Modal>
        <Loader fullPage loading={requestingDetails} text={t('Loading')} />
      </>
    );
  }
}

App.propTypes = {
  search: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
  recommendation: PropTypes.object.isRequired,
  recommendations: PropTypes.array.isRequired,
  application: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  showingApplications: PropTypes.array.isRequired,
  showingPage: PropTypes.number.isRequired,
  detailsModal: PropTypes.bool.isRequired,
  requestingDetails: PropTypes.bool.isRequired,
  requestingRecommendations: PropTypes.bool.isRequired,
  requestingApplications: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  const {
    search,
    searchResult,
    recommendation,
    recommendations,
    application,
    applications,
    showingApplications,
    showingPage,
    detailsModal,
    requestingDetails,
    requestingRecommendations,
    requestingApplications,
    position,
    category
  } = state.appstore;
  return (
    {
      search,
      searchResult,
      recommendation,
      recommendations,
      application,
      applications,
      showingApplications,
      showingPage,
      detailsModal,
      requestingDetails,
      requestingRecommendations,
      requestingApplications,
      position,
      category,
    }
  )
}
export default connect(mapStateToProps)(withTranslation()(App))
