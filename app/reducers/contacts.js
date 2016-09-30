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
    createContact('Tim', '5312425', 'Tim@gmail.com')
  ],

  viewContactId: null //put in the contact id if opened
}

export default createReducer(initialState, {

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
