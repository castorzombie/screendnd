import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteScreen, detailsScreen } from '../actions/screensActions';

class Screen extends Component {

  deleteScreen = () => {
    this.props.deleteScreen(this.props.info.id)
  }

  detailsScreen = () => {
    this.props.detailsScreen(this.props.info.id)
  }

  render() {
    const {name} = this.props.info;
    return (
      <div className="media mt-2">
        <div className="media-body row">
          <div className="col-md-7 pt-1"> {name} </div>
          <div className="col-md-3 p-1">
            <button 
              onClick={this.detailsScreen}
              className="btn btn-info btn-sm">Details
            </button> 
          </div>
          <div className="col-md-2 p-1">
            <button 
              onClick={this.deleteScreen}
              className="btn btn-danger btn-sm">&times;
            </button>
          </div>           
        </div>
      </div>
    )
  }
}

export default connect(null, {deleteScreen, detailsScreen})(Screen);
