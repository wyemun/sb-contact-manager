import React, {Component} from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {deleteContact} from '../actions/contact'

class ContactList extends Component {

  render() {
    const {contacts: {items}, actions:{deleteContact}} = this.props

    return (
      <div className="row">
        <div className='col-xs-12 main-container'>
          <h2 className="page-header text-center">List of contacts</h2>
          <p className="text-center">
            <Link to='/create' className="btn btn-lg btn-outline">Add Contact</Link>
          </p>

          <ul className="media-list row contacts-container">
            {_.map(items, item => <ContactCard key={`item-${item.id}`} {...item} onClickDelete={deleteContact.bind(this, item.id)} />)}
          </ul>
        </div>
      </div>
    )
  }
}

const ContactCard = ({id, full_name, telephone, email, photo, onClickDelete}) => (
  <li className="media col-md-6 col-lg-4">
    <div className="thumbnail">
      <img className="media-object" src={photo} />
    </div>
    <div className="media-heading">
      <h3>
        {full_name}
        <small>
          {' '}
          <Link to={`/edit/${id}`}><span className="glyphicon glyphicon-pencil"></span></Link>
          {' '}
          <a className="delete-contract" onClick={onClickDelete}>
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
    deleteContact: (id) => {dispatch(deleteContact(id))}
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
