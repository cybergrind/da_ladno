function mirrorDict(keys){
    let out = {};
    for (k in keys){
        out[k] = k;
    }
}

export default mirrorDict({
    JUICK_NEXT: null,
    JUICK_BEFORE: null,
});
