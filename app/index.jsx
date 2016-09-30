import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import config from './config.json'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { Router, Route, IndexRoute, browserHistory  } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { requireAuthentication } from './components/AuthenticatedComponent'

import { App, Home, Login, Room, RoomCreation, NotFound } from './containers'
import SettingModal from './components/room/SettingModal'
import * as reducers from './reducers'

import { loginUserSuccess } from './actions/authentication'
import promiseMiddleware from './middlewares/promise'
import chatSocketMiddleware from './middlewares/chatsocket'
// import { registerDevice } from './actions/gcm'

/**
 * HISTORY
 */
// const browserHistory = useRouterHistory(createHistory)({
//   basename: '/'
// })

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
   applyMiddleware(thunk, chatSocketMiddleware, promiseMiddleware),
   applyMiddleware(routerMiddleware(browserHistory)),
   window.devToolsExtension ? window.devToolsExtension() : f => f //TODO disable this on production
 )
)

const history = syncHistoryWithStore(browserHistory, store)

/**
 * AUTHENTICATION STATE
 */
 let token = localStorage.getItem('token')
 if (token !== null) {
     store.dispatch(loginUserSuccess(token))
     //initServiceWorker()
 }

 function initServiceWorker() {
   if ('serviceWorker' in navigator) {
     console.log('Service Worker is supported')
     navigator.serviceWorker.register('/js/sw.js').then(function(reg) {
       reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            // console.log('what is subscription?', JSON.parse(JSON.stringify(sub)))
            //const url = sub.endpoint
            //call dispatch action to update GCM key on server side
            store.dispatch(registerDevice(JSON.parse(JSON.stringify(sub))))
        })
     }).catch(function(err) {
       console.log(':^(', err)
     })
    }
 }


//<Route path="room/:id" component={requireAuthentication(ChatRoom)}/>
 /**
  * MAIN ROUTER
  */
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/room/:id" component={requireAuthentication(Room)} onEnter={Room.onEnter.bind(null, store.dispatch)}>
          <Route path="settings" component={SettingModal}/>
        </Route>

        <Route path="/" component={App}>
          <IndexRoute component={requireAuthentication(Home)}/>
          <Route path="login" component={Login}/>
          <Route path="rooms">
            <Route path="create" component={requireAuthentication(RoomCreation)} />
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  )
