import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ContactList extends Component {

  render() {

    return (
      <div className="row">
        <div className='col-xs-12 main-container'>
          <h2 className="page-header text-center">List of contacts</h2>
          <p className="text-center">
            <a className="btn btn-lg btn-outline">Add Contact</a>
          </p>

          <ul className="media-list row contacts-container">
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
          </ul>
        </div>
      </div>
    )
  }
}

const ContactCard = ({}) => (
  <li className="media col-md-6 col-lg-4">
    <div className="thumbnail">
      <img className="media-object" src="/img/12.jpg" />
    </div>
    <div className="media-heading">
      <h3>
        Terrence S. Hatfield
        <small>
          <a><span className="glyphicon glyphicon-pencil"></span></a>
          <a className="delete-contract">
            <span className="glyphicon glyphicon-trash"></span>
          </a>
        </small>
      </h3>
    </div>
    <div className="media-body">
      <dl>
        <dt>Phone Number:</dt>
        <dd>651-603-1723</dd>
        <dt>Email:</dt>
        <dd>TerrenceSHatfield@rhyta.com</dd>
      </dl>
    </div>
    <hr/>
  </li>
)

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : {

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
