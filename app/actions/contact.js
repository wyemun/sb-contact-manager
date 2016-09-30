import c from '../constants'
import { goBack } from 'react-router-redux'

// I'm just using Redux Thunk for this quick quiz
// A larger app, especially with parallel process or async
// can use something like Side Effect library like Redux Saga

export function saveContact({full_name, email, telephone}) {

  return (dispatch, getState) => {

    dispatch({
      type: c.CONTACT_SAVE,
      payload: {full_name, email, telephone}
    })

    dispatch(goBack())

    //next tick, quick way of saving, assuming saving always successful in this case
    //a more correct way is to use Side Effect way to trigger this instead
    setTimeout(()=>{
      const {contacts: {items}} = getState()
      localStorage.setItem('contacts', JSON.stringify(items))
    }, 0)

    return
  }
}

export function openContact(id) {
  return {
    type: c.CONTACT_OPEN,
    payload: { id }
  }
}

export function deleteContact(id) {
  return {
    type: c.CONTACT_DELETE,
    payload: { id }
  }
}

export function clearViewContact() {
  return {
    type: c.CONTACT_CLEAR_VIEW
  }
}

export function loadContactList(records) {
  return {
    type: c.LOAD_CONTACTS,
    payload: {records}
  }
}
