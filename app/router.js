import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { App, NotFound } from './containers'

const AppRouter = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>

      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>
)
// <IndexRoute component={Home}/>
// <Route path="login" component={Login}/>
export default AppRouter
