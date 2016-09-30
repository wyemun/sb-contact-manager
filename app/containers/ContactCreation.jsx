import React, {Component} from 'react'
import { Link } from 'react-router'
import { goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContactActionCreator from '../actions/contact'

class ContactCreation extends Component {
  render() {

    const {actions} = this.props

    return (
      <div className="row">
        <div className='col-xs-12 main-container'>
          <h2 className="page-header text-center">Create Contact</h2>

          <form role="form" className="form-horizontal contract-form">
            <div className="form-group">
              <label className="col-sm-4 control-label">Full name:</label>
              <div className="col-sm-6">
                <input type="text" className="form-control contact-name-input" value=""/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Email address:</label>
              <div className="col-sm-6">
                <input type="email" className="form-control contact-email-input" value=""/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-4 control-label">Telephone number:</label>
              <div className="col-sm-6">
                <input type="tel" className="form-control contact-tel-input" value=""/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-3">
                <a className="btn btn-outline btn-lg btn-block" onClick={::actions.saveContact}>Submit</a>
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
}

const FormField = ({}) => (
  
)

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : {
    ...bindActionCreators(ContactActionCreator, dispatch),
    goBack: () => {dispatch(goBack())}
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactCreation);
