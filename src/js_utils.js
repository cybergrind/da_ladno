import _ from 'lodash';


export function path_set(k, v, obj) {
    /**
     * k='a.b.v' v=1 became: {'a': {'b': {'v': 1}}}
     */
    /* eslint-disable no-console */
    console.log('Path set: ', k, v, obj);
    const full = typeof(k) === 'string' ? k.split('.') : k;
    const path = full.slice(0, full.length - 1);
    const key = full[full.length - 1];
    const curr = _.reduce(path, (memo, name) => {
        /* eslint-disable no-param-reassign */
        memo[name] = Object.assign({}, memo[name] || {});
        return memo[name];
    }, obj);
    curr[key] = v;
}

export function path_get(k, obj) {
    const path = typeof(k) === 'string' ? k.split('.') : k;
    // console.log('Path get: ', k, obj, curr);
    return _.reduce(path, (memo, name) => (!memo ? memo : memo[name]), obj);
}
