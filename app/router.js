import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { App, ContactList, ContactCreation, NotFound } from './containers'
import {clearViewContact, openContact} from './actions/contact'

const onEnterEdit = (dispatch, {location, params, routes}, replaceState) => {
  dispatch(openContact(params.id))
}

const AppRouter = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ContactList}/>
        <Route path="create" component={ContactCreation} />
        <Route path="edit/:id" component={ContactCreation}
          onEnter={onEnterEdit.bind(null, store.dispatch)}
          onLeave={()=>store.dispatch(clearViewContact())}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>
)
export default AppRouter
