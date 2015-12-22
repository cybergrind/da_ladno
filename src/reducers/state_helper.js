import { TYPE } from '../actions';
import { path_set } from '../js_utils';


export default function state_helper_reducer(state={}, action){
    if (action.type == TYPE.STATE_HELPER){
        path_set(action.key, action.value, state);
    } else if (action.type == TYPE.EBUS && action.state_helper){
        let h = action.state_helper;
        path_set(h.key, h.value, state);
    }
    return state;
}
