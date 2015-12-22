import _ from 'lodash';


export function path_set(k, v, obj){
    /**
     * k='a.b.v' v=1 became: {'a': {'b': {'v': 1}}}
     */
    console.log('Path set: ', k, v, obj);
    let full;
    if (typeof(k) == 'string'){
        full = k.split('.');
    } else {
        full = k;
    }
    let path = full.slice(0, full.length-1);
    let key = full[full.length-1];
    let curr = _.reduce(path, (curr, name) => {
        curr[name] = Object.assign({}, curr[name] || {});
        return curr[name];
    }, obj);
    curr[key] = v;
}

export function path_get(k, obj){
    let path;
    if (typeof(k) == 'string'){
        path = k.split('.');
    } else {
        path = k;
    }
    let curr = _.reduce(path, (curr, name) => {
        if (!curr){ return curr; }
        return curr[name];
    }, obj);
    console.log('Path get: ', k, obj, curr);
    return curr;
}
