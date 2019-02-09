
import React, { Component } from "react";
import Header from './Header'
import AddScreen from './AddScreen';
import ListScreen from './ListScreen';
import '../styles/App.css';
import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
          <Provider store={store}>
            <div className="container">
            <Header title={'Create screens and add widgets'} />
            <div className="row">
              <div className="col-md-4">
                  <AddScreen />
                  <ListScreen />
              </div>
              <div className="col-md-8">
    
              </div>
            </div>
          </div>
        </Provider>
        );
    }
}

export default App;