import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { App, ContactList, ContactCreation, NotFound } from './containers'

const AppRouter = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ContactList}/>
        <Route path="create" component={ContactCreation} />
        <Route path="edit/:id" component={ContactCreation} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>
)
export default AppRouter
