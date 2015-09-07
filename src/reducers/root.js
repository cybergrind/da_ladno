
export function root_reducer(state, action){
    let new_state = Object.assign({}, state || {});
    console.log(`Old state ${state}, Action: ${action} NewState: ${new_state}`)
    return new_state;
}

