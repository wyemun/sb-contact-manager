import {createConstants} from '../utils'

//
// Can break them down down to components for modularization purpose
// This is just a quick example as there are not many constants (Wyemun)

const constants = createConstants(
  'CONTACT_SAVE',
  'CONTACT_OPEN',
  'CONTACT_DELETE'
)

export default constants
