import { compose } from 'redux'

import state_helper_reducer from './state_helper'


function curry_second(func, second_arg){
    return first_arg => func(first_arg, second_arg)
}

let reducers = [state_helper_reducer];

export function root_reducer(state, action){
    let new_state = Object.assign({}, state || {});
    let rlist = reducers.map(f => curry_second(f, action));
    compose(...rlist)(new_state);
    console.log('Old state', state, 'Action: ', action, 'NewState: ', new_state);
    return new_state;
}

