import { compose, createStore } from 'redux';
import { root_reducer } from '../reducers/root.js';
//import { DevTools } from '../components/devtools.jsx';
//import { persistState } from 'redux-devtools';


if (process.env.NODE_ENV === 'development'){
    var createStoreFun = createStore;
} else {
    var createStoreFun = createStore;
}

let store = createStoreFun(root_reducer, {'juick_messages': {}});
export default store;
