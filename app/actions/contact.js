import c from '../constants'

// I'm just using Redux Thunk for this quick quiz
// A larger app, especially with parallel process or async
// can use something like Side Effect library like Redux Saga

export function saveContact() {

  //get from getState

  return {
    type: c.CONTACT_SAVE
  }
}

export function openContact(id) {
  return {
    type: c.CONTACT_OPEN,
    payload: { request: {id} }
  }
}

export function deleteContact(id) {
  return {
    type: c.CONTACT_DELETE,
    payload: { request: {id} }
  }
}
