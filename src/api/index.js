const methods = {
    fetch,
    post: (url, body) => fetch(url, Object.assign({}, {body}, {method: 'POST'})),
    patch: (url, body) => fetch(url, Object.assign({}, {body}, {method: 'PATCH'})),
    delete: (url, body) => fetch(url, Object.assign({}, {body}, {method: 'DELETE'})),
};

const urls = {
    wines: (opts) => `/lite/pairing/?restaurant_id=${opts.restaurantId}&food_id=${opts.foodId || 0}`,
    wineExtended: id => id ? `/wine/info/extended/?wine_ids=${id}` : '/wine/info/extended/',
    meal: id => id ? '' : '/lite/meal/',
};

export const getStoreData = opts => methods.fetch(urls.wines(opts), opts);
export const getMeal = opts => methods.fetch(urls.meal(opts.id), opts);
export const getWineInfo = opts => methods.fetch(urls.wineExtended(opts.id), opts);
