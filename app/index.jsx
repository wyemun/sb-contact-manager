import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './reducers'
import AppRouter from './router'


/**
 * STORE
 */
const store = createStore(
 combineReducers({
   ...reducers,
   routing: routerReducer,
   form: formReducer
 }),
 compose(
   applyMiddleware(thunk),
   applyMiddleware(routerMiddleware(browserHistory)),
   window.devToolsExtension ? window.devToolsExtension() : f => f //TODO disable this on production
 )
)

const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render( AppRouter(store, history), document.getElementById('app'))
