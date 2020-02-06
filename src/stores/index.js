import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import appstoreApp from '../reducers'

const loggerMiddleware = createLogger()
export default function configureStore(preloadedState) {
  return createStore(
    appstoreApp,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}