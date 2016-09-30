import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {

  render() {
    const {children} = this.props
    
    return (
      <div className="app-container">
        <h1>Hello World</h1>
        {children}
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
