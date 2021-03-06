import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {

  render() {
    const {children} = this.props

    return (
      <div>
        <header className="bs-header">
          <div className="container">
            <h1>Contact Manager</h1>
            <p>Simple React + Redux example application by <a className='text-link' href="https://twitter.com/wyemun">wyemun</a></p>
            <p style={{marginTop: '1rem'}}><a href="https://github.com/wyemun/sb-contact-manager/" className="btn btn-outline white btn-lg" role="button">View on Github</a></p>
          </div>
        </header>

        <div className="container">
          {children}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  actions : {

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
