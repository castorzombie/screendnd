import React, { Component } from 'react'
import Screen from './Screen';
import {connect} from 'react-redux';
import {getScreens} from '../actions/screensActions';
import store from '../store';

store.subscribe( () => {
  localStorage.setItem('screens', JSON.stringify(store.getState()))
})


class ListScreen extends Component {

componentDidMount() {
  this.props.getScreens();
}

  render() {

    const screens = this.props;
    console.log(screens.screens);
    const msg = Object.keys(screens.screens).length === 0 ? 'No screesn avaliable': 'screens available';
    
    return (
      <div className="card mt-5">
          <div className="card-body">
              <h2 className="card-title text-center">{msg}</h2>
              <div className="screen-list">
                      {Object.keys(this.props.screens).map(screen => (
                          <Screen
                              key={screen}
                              info={this.props.screens[screen]}
                              idCita={screen}
                              deleteScreen={this.props.deleteScreen}
                          />
                      ))}
              </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  screens: state.screens.screens
})

export default connect(mapStateToProps, {getScreens}) (ListScreen)
