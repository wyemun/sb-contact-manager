import {createReducer} from '../utils'
import c from '../constants'
import _ from 'lodash'
import uuid from 'uuid'


const initialState = {
  items: [],
  viewContactId: null //put in the contact id if opened
}

export default createReducer(initialState, {
  [c.CONTACT_OPEN] : (state, {id}) => (
    {
      ...state,
      viewContactId: id
    }
  ),

  [c.CONTACT_SAVE] : (state, {full_name, telephone, email}) => {
    let newItems = []

    if(state.viewContactId) {
      newItems = _.map(state.items, (item) => {
        if(item.id !== state.viewContactId) return item
        return {...item, full_name, telephone, email}
      })
    } else {
      newItems = [...state.items, createContact(full_name, telephone, email)]
    }

    return {
      ...state,
      items: newItems,
      viewContactId: null
    }
  },

  [c.CONTACT_DELETE] : (state, {id}) => (
    {
      ...state,
      items:  _.reject(state.items, (item) => item.id === id),
      viewContactId: null
    }
  ),

  [c.CONTACT_CLEAR_VIEW] : (state) => (
    {
      ...state,
      viewContactId: null
    }
  ),

  [c.LOAD_CONTACTS] : (state, {records}) => (
    {
      ...state,
      items: records
    }
  )
})

export function createContact(full_name, telephone, email) {
  return {
    id: uuid.v4(),
    photo: `/img/${_.random(1, 15)}.jpg`,
    full_name,
    telephone,
    email
  }
}
