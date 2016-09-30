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
            <p>Simple React + Redux example application by wyemun</p>
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
