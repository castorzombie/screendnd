import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducerPrincipal from './reducers';

const initialState = [];

const middleware = [thunk];

const storageState = localStorage.getItem('screens') ? JSON.parse(localStorage.getItem('screens')) : [];

// dev tools middleware
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

// store
let store = createStore(
    reducerPrincipal, storageState, 
    composeSetup(applyMiddleware(...middleware))
);

export default store;