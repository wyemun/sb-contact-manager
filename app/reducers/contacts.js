import {createReducer} from '../utils'
import c from '../constants'
import _ from 'lodash'
import uuid from 'uuid'


const initialState = {
  items: [
    createContact('Bruce', '5122444', 'Bruce@gmail.com'),
    createContact('Jason', '8822444', 'Jason@gmail.com'),
    createContact('Greyson', '9912425', 'Greyson@gmail.com'),
    createContact('Kelly', '6622444', 'Kelly@gmail.com'),
    createContact('Damian', '7722444', 'Damian@gmail.com'),
    createContact('Tim', '5312425', 'Tim@gmail.com') //TODO get this from localStorage or cookie as requested
  ],

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
      //TODO
      viewContactId: null
    }
  ),

  [c.CONTACT_CLEAR_VIEW] : (state) => (
    {
      ...state,
      viewContactId: null
    }
  )
})

function createContact(full_name, telephone, email) {
  return {
    id: uuid.v4(),
    photo: `/img/${_.random(1, 15)}.jpg`,
    full_name,
    telephone,
    email
  }
}
