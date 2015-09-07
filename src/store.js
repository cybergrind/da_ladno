
import { compose, createStore } from 'redux';
import { root_reducer } from './reducers/root.js';

import { devTools, persistState } from 'redux-devtools';


if (process.env.NODE_ENV === 'development'){
    var createStoreFun = compose(
        devTools(),
        persistState(window.location.href.match(/[?&]dbg=([^&]+)\b/))
    )(createStore)
} else {
    var createStoreFun = createStore;
}

let store = createStoreFun(root_reducer, {})
export default store;

