import { TYPE } from '../actions'

function state_set(k, v, state){
    /**
     * k='a.b.v' v=1 became: {'a': {'b': {'v': 1}}}
    */
    let full = k.split('.');
    let path = full.slice(0, full.length-1);
    let key = full[full.length-1];
    let curr = path.reduce((curr, name) => {
        curr[name] = curr[name] || {}
        return curr[name]
    }, state);
    curr[key] = v
}

export default function state_helper_reducer(state, action){
    if (action.type === TYPE.STATE_HELPER){
        state_set(action.key, action.value, state);
    }
    return state;
}
