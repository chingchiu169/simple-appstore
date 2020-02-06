import { combineReducers } from 'redux'
import {
  REQUEST_RECOMMENDATIONS,
  RECEIVE_RECOMMENDATIONS,
  REQUEST_APPLICATIONS,
  RECEIVE_APPLICATIONS,
  SHOWING_APPLICATIONS,
  SHOW_APPLICATION_DETAILS,
  CLOSE_APPLICATION_DETAILS,
  REQUEST_DETAILS,
  RECEIVE_DETAILS,
  SERACH_APPLICATIONS,
  SCROLLING,
  SHOW_CATEGORY,
} from '../actions'
const initialState = {
  search: "",
  searchResult: [],

  recommendation: {},
  recommendations: [],


  application: {},
  applications: [],

  showingApplications: [],
  showingPage: 0,

  detailsModal: false,
  requestingDetails: false,

  requestingRecommendations: false,
  requestingApplications: false,

  position: 0,
  category: ""
}
function applications(
  state = {
    search: "",
    searchResult: [],

    recommendation: {},
    recommendations: [],


    application: {},
    applications: [],

    showingApplications: [],
    showingPage: 0,

    detailsModal: false,
    requestingDetails: false,

    requestingRecommendations: false,
    requestingApplications: false,

    position: 0,
    category: ""
  },
  action
) {
  switch (action.type) {
    case REQUEST_RECOMMENDATIONS:
      return Object.assign({}, state, {
        requestingRecommendations: true,
      })
    case RECEIVE_RECOMMENDATIONS:
      return Object.assign({}, state, {
        requestingRecommendations: false,
        recommendations: action.recommendations,
      })
    case REQUEST_APPLICATIONS:
      return Object.assign({}, state, {
        requestingApplications: true,
      })
    case RECEIVE_APPLICATIONS:
      return Object.assign({}, state, {
        requestingApplications: false,
        applications: action.applications,
      })
    case SHOWING_APPLICATIONS:
      var category = state.category
      var applications = []
      var showingApplications = []
      if (category !== "") {
        applications = state.applications.filter(value => value.genres.findIndex(genre => genre.genreId === category) > -1)
        showingApplications = state.applications.map(value => value)
      }
      else {
        applications = state.applications.map(value => value)
        showingApplications = state.showingApplications.map(value => value)
      }
      var showingPage = action.showingPage
      showingApplications.push(...applications.slice(showingPage * 10, showingPage * 10 + 10))
      return Object.assign({}, state, {
        showingApplications: showingApplications,
        showingPage: showingPage
      })
    case REQUEST_DETAILS:
      return Object.assign({}, state, {
        requestingDetails: true,
      })
    case RECEIVE_DETAILS:
      return Object.assign({}, state, {
        requestingDetails: false,
        application: action.application,
      })
    case SERACH_APPLICATIONS:
      var search = action.search.toUpperCase();
      if (!search) {
        return Object.assign({}, state, {
          search: action.search,
          searchResult: []
        })
      }
      var applicationsArray = state.applications.map(value => value)
      var recommendations = state.recommendations.map(value => value)
      applicationsArray.push(...recommendations)
      var allApplications = applicationsArray.map(value => value)
      var searchResult = allApplications.filter(value => (value.name.toUpperCase().indexOf(search) > -1) || (value.artistName.toUpperCase().indexOf(search) > -1) || value.genres.find(genre => genre.name.toUpperCase().indexOf(search) > -1)).reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return Object.assign({}, state, {
        search: search,
        searchResult: searchResult
      })
    case SHOW_CATEGORY:
      var resultArray = state.applications.map(value => value)
      var categoryApplications = resultArray.filter((value) => value.genres.findIndex(genre => genre.genreId === action.category) > -1)
      return Object.assign({}, state, {
        showingApplications: categoryApplications,
        category: action.category,
        showingPage: action.showingPage
      })
    default:
      return state
  }
}
function appstore(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RECOMMENDATIONS:
      return Object.assign({}, state, applications(state, action))
    case RECEIVE_RECOMMENDATIONS:
    case REQUEST_APPLICATIONS:
      return Object.assign({}, state, applications(state, action))
    case RECEIVE_APPLICATIONS:
    case SHOWING_APPLICATIONS:
      return Object.assign({}, state, applications(state, action))
    case SHOW_APPLICATION_DETAILS:
      return Object.assign({}, state, { detailsModal: true })
    case CLOSE_APPLICATION_DETAILS:
      return Object.assign({}, state, { detailsModal: false })
    case REQUEST_DETAILS:
      return Object.assign({}, state, applications(state, action))
    case RECEIVE_DETAILS:
      return Object.assign({}, state, applications(state, action))
    case SERACH_APPLICATIONS:
      return Object.assign({}, state, applications(state, action))
    case SCROLLING:
      return Object.assign({}, state, { position: action.position })
    case SHOW_CATEGORY:
      return Object.assign({}, state, applications(state, action))
    default:
      return state
  }
}

const appstoreApp = combineReducers({
  appstore,
})
export default appstoreApp