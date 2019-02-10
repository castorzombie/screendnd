import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addScreen } from '../actions/screensActions';
import uuid from 'uuid';

const itemsWidgets = [
  {id: "item-1", content: "widget 1"},
  {id: "item-2", content: "widget 2"},
  {id: "item-3", content: "widget 3"},
  {id: "item-4", content: "widget 4"},
  {id: "item-5", content: "widget 5"},
  {id: "item-6", content: "widget 6"},
  {id: "item-7", content: "widget 7"},
  {id: "item-8", content: "widget 8"},
  {id: "item-9", content: "widget 9"},
  {id: "item-10", content: "widget 10"}
];

const selectedWidgets = [];

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
      name: this.state.screenName,
      itemsWidgets: itemsWidgets,
      selectedWidgets: selectedWidgets
    }
    this.props.addScreen(newScreen);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Add screen</h3>
          <form onSubmit={this.addNewScreen}>
              <div className="row">
                <div className="col-sm-12">
                    <input onChange={this.setScreenName} type="text" className="form-control" placeholder="Add name" />
                </div>
              </div>
              <div className="form-group row justify-content-end">
                  <div className="col-sm-12 mt-2">
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
