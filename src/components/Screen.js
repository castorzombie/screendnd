import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteScreen } from '../actions/screensActions';



class Screen extends Component {

    deleteScreen = () => {
      this.props.deleteScreen(this.props.info.id)
    }

  render() {
    const {name} = this.props.info;
    return (
      <div className="media mt-3">
      <div className="media-body">
          <p className="card-text"> {name} </p>
          <button 
              onClick={this.deleteScreen}
              className="btn btn-danger">Delete &times;
          </button>
      </div>
  </div>
    )
  }
}

export default connect(null, {deleteScreen})(Screen);
