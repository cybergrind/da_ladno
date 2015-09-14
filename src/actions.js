
import store from './store'


export let TYPE = {
}

let simple_types = ['STATE_HELPER']

function init_type(){
    simple_types.forEach(x => TYPE[x] = x)
}
init_type();

export function set_state(key, value){
    store.dispatch({type: TYPE.STATE_HELPER,
                    key: key, value: value});
}
