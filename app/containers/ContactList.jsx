import React, {Component} from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ContactList extends Component {

  render() {
    const {contacts: {items}} = this.props

    return (
      <div className="row">
        <div className='col-xs-12 main-container'>
          <h2 className="page-header text-center">List of contacts</h2>
          <p className="text-center">
            <Link to='/create' className="btn btn-lg btn-outline">Add Contact</Link>
          </p>

          <ul className="media-list row contacts-container">
            {_.map(items, item => <ContactCard key={`item-${item.id}`} {...item} />)}
          </ul>
        </div>
      </div>
    )
  }
}

const ContactCard = ({id, full_name, telephone, email, photo}) => (
  <li className="media col-md-6 col-lg-4">
    <div className="thumbnail">
      <img className="media-object" src={photo} />
    </div>
    <div className="media-heading">
      <h3>
        {full_name}
        <small>
          {' '}
          <a><span className="glyphicon glyphicon-pencil"></span></a>
          {' '}
          <a className="delete-contract">
            <span className="glyphicon glyphicon-trash"></span>
          </a>
        </small>
      </h3>
    </div>
    <div className="media-body">
      <dl>
        <dt>Phone Number:</dt>
        <dd>{telephone}</dd>
        <dt>Email:</dt>
        <dd>{email}</dd>
      </dl>
    </div>
    <hr/>
  </li>
)

const mapStateToProps = (state) => ({
  contacts: {...state.contacts}
})

const mapDispatchToProps = (dispatch) => ({
  actions : {

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
