import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addScreen } from '../actions/screensActions';
import uuid from 'uuid';

class AddScreen extends Component {
  constructor(){
    super();
    this.state = {
      screenName: ''
    }
  }

  setScreenName = (e) => {
    this.setState({
        screenName: e.target.value
    })
  }

  addNewScreen = (e) => {
    e.preventDefault();
    const newScreen = {
      id: uuid(),
      name: this.state.screenName
    }
    this.props.addScreen(newScreen);
  }

  render() {
    return (
      <div className="card mt-5">
        <div className="card-body">
          <h3 className="card-title">Add screen</h3>
          <form onSubmit={this.addNewScreen}>
              <div className="row">
                <div className="col-sm-4 col-lg-2"> Name</div>
                <div className="col-sm-8 col-lg-10">
                    <input onChange={this.setScreenName} type="text" className="form-control" placeholder="add name screen" />
                </div>
              </div>
              <div className="form-group row justify-content-end">
                  <div className="col-sm-12">
                      <button type="submit" className="btn btn-success w-100">Add</button>
                  </div>
              </div>
          </form>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  screens: state.screens.screens
});

export default connect(mapStateToProps,{addScreen})(AddScreen);
