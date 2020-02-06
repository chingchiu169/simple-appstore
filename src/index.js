import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-overlay-loader/styles.css';
import './asserts/css/custom.css'
import Root from './containers/Root'
ReactDOM.render(<Root />, document.getElementById('root'))
