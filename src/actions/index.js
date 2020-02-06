// import applications from '../asserts/json/applications.json'
// import grossings from '../asserts/json/grossings.json'
export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'
export const REQUEST_APPLICATIONS = 'REQUEST_APPLICATIONS'
export const RECEIVE_APPLICATIONS = 'RECEIVE_APPLICATIONS'
export const SHOWING_APPLICATIONS = 'SHOWING_APPLICATIONS'
export const SHOW_APPLICATION_DETAILS = 'SHOW_APPLICATION_DETAILS'
export const CLOSE_APPLICATION_DETAILS = 'CLOSE_APPLICATION_DETAILS'
export const REQUEST_DETAILS = 'REQUEST_DETAILS'
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS'
export const SERACH_APPLICATIONS = 'SERACH_APPLICATIONS'
export const SCROLLING = 'SCROLLING'
export const SHOW_CATEGORY = 'SHOW_CATEGORY'

function requestRecommendations() {
  return {
    type: REQUEST_RECOMMENDATIONS,
  }
}
function receiveRecommendations(json) {
  return {
    type: RECEIVE_RECOMMENDATIONS,
    recommendations: json.feed.results,
  }
}
function requestApplications() {
  return {
    type: REQUEST_APPLICATIONS,
  }
}
function receiveApplications(json) {
  return {
    type: RECEIVE_APPLICATIONS,
    applications: json.feed.results,
  }
}
export function showingApplications(showingPage) {
  return {
    type: SHOWING_APPLICATIONS,
    showingPage: showingPage
  }
}
function showApplicationDetailsModal() {
  return {
    type: SHOW_APPLICATION_DETAILS,
  }
}
function closeApplicationDetailsModal() {
  return {
    type: CLOSE_APPLICATION_DETAILS,
  }
}
function requestDetails() {
  return {
    type: REQUEST_DETAILS,
  }
}
function receiveDetails(json) {
  return {
    type: RECEIVE_DETAILS,
    application: json.results[0],
  }
}

export function fetchAllNow() {
  return dispatch => {
    dispatch(requestRecommendations())
    fetch(`https://cors-anywhere.herokuapp.com/https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json`)
      .then(response => response.json())
      .then(json => { dispatch(receiveRecommendations(json)) })
    // setTimeout(() => {
    //   dispatch(receiveRecommendations(grossings))
    // }, 1000)

    dispatch(requestApplications())
    fetch(`https://cors-anywhere.herokuapp.com/https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/100/explicit.json`)
      .then(response => response.json())
      .then(json => { dispatch(receiveApplications(json)); dispatch(showingApplications(0)) })
    // setTimeout(() => {
    //   dispatch(receiveApplications(applications)); dispatch(showingApplications(0))
    // }, 1000)
  }
}
export function showApplicationDetails(application) {
  return dispatch => {
    // dispatch(showApplicationDetailsModal())
    dispatch(requestDetails())
    fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/hk/lookup?id=${application.id}`)
      .then(response => response.json())
      .then(json => { dispatch(showApplicationDetailsModal()); dispatch(receiveDetails(json)) })

  }
}
export function closeApplicationDetails() {
  return dispatch => {
    dispatch(closeApplicationDetailsModal())
  }
}
export function searchApplications(search) {
  return {
    type: SERACH_APPLICATIONS,
    search: search,
  }
}
export function scrolling(position) {
  return {
    type: SCROLLING,
    position: position
  }
}
export function showingCategory(category) {
  return {
    type: SHOW_CATEGORY,
    category: category,
    showingPage: 0
  }
}