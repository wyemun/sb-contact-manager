import React, {Component} from 'react'
import validator from 'validator'
import { Link } from 'react-router'
import { goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContactActionCreator from '../actions/contact'

import { Field, reduxForm } from 'redux-form'

class ContactCreation extends Component {
  render() {

    const {actions, handleSubmit, pristine, submitting} = this.props

    return (
      <div className="row">
        <div className='col-xs-12 main-container'>
          <h2 className="page-header text-center">Create Contact</h2>

          <form role="form" className="form-horizontal contract-form" onSubmit={handleSubmit(::this.onSubmit)}>

            <Field name='full_name'
              label="Full name"
              placeholder="Name of the contact person"
              extraClass='contact-name-input'
              component={FormField} />

            <Field name='email'
              label="Email address"
              placeholder="Email address, eg: name@email.com"
              type='email'
              extraClass='contact-email-input'
              component={FormField} />

            <Field name='telephone'
              label="Telephone number"
              placeholder="eg: 91224242"
              type='tel'
              extraClass='contact-tel-input'
              component={FormField} />

            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-3">
                <button type='submit' className="btn btn-outline btn-lg btn-block">Submit</button>
              </div>
              <div className="col-sm-3">
                <a className="btn btn-outline btn-lg btn-block" onClick={actions.goBack}>Cancel</a>
              </div>
            </div>
          </form>

        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.actions.saveContact(values)
  }

}

//
// Added custom validator
const validateForm = ({full_name, telephone, email}) => {
  const errors = {}

  if(!full_name || !full_name.match(/^[ A-Za-z0-9_@./#&+-]*$/)) {
    errors.full_name = 'Full name is required. Only accept alphanumerical and _@./#&+-'
  }

  if(!telephone || !validator.isNumeric(telephone) ) {
    errors.telephone = 'Telephone numbers have to be numerical.'
  }

  if(!email || !validator.isEmail(email) ) {
    errors.email = 'An valid email is required.'
  }

  return errors
}

//reusable form field
const FormField = ({input, label, type='text', placeholder='', meta: {touched, error}, extraClass = ''}) => (
  <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className="col-sm-4 control-label">{label}:</label>
    <div className="col-sm-6">
      <input {...input} type={type} className={`form-control ${extraClass}`} placeholder={placeholder}/>
    </div>
  </div>
)

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : {
    ...bindActionCreators(ContactActionCreator, dispatch),
    goBack: () => {dispatch(goBack())}
  }
})

const RFWrappedComponent = reduxForm({
  form: 'contact_creation',
  validate: validateForm
})(ContactCreation)


export default connect(mapStateToProps, mapDispatchToProps)(RFWrappedComponent);
