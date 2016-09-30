import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './reducers'
import AppRouter from './router'
import {loadContactList} from './actions/contact'
import {createContact} from './reducers/contacts'
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

//initialize contact list
const contacts = localStorage.getItem('contacts')
if (contacts !== null) {
   store.dispatch(loadContactList(JSON.parse(contacts)))
} else {
  const newContacts = [
    createContact('Bruce', '5122444', 'Bruce@gmail.com'),
    createContact('Jason', '8822444', 'Jason@gmail.com'),
    createContact('Greyson', '9912425', 'Greyson@gmail.com'),
    createContact('Kelly', '6622444', 'Kelly@gmail.com'),
    createContact('Damian', '7722444', 'Damian@gmail.com'),
    createContact('Tim', '5312425', 'Tim@gmail.com')
  ]
  localStorage.setItem('contacts', JSON.stringify(newContacts))
  store.dispatch(loadContactList(newContacts))
}
