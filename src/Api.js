const defaultUrl = 'https://snu-coin.herokuapp.com';
const LOGIN_KEY = 'LOGIN_KEY';

const getDefaultHeaders = () => {
    const defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (localStorage.getItem(LOGIN_KEY))
        defaultHeaders['Authorization'] = `Key ${localStorage.getItem(LOGIN_KEY)}`;
    return defaultHeaders;
}

const post = async (url, body={}, extraHeaders={}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'POST',
        body: new URLSearchParams(body).toString(),
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

const get = async (url, query={}, extraHeaders={}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'GET',
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

const deleteCall = async (url, query={}, extraHeaders={}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {...getDefaultHeaders(), ...extraHeaders}
    });

    return await res.json();
}

const login = async (name, password) => {
    return await post('login', {name, password});
}

const login_by_key = async (key) => {
    return await post('login_by_key', {key});
}

const loadAssets = async () => {
    return await get('assets');
}

const loadMarkets = async() => {
    return await get('markets');
}

const loadMarket = async(market) => {
    return await get(`markets/${market}`);
}

const getOrders = async () => {
    return await get('orders');
}

const orders = async (price, quantity, marketName, side) => {
    const body = {
        'price': price,
        'quantity': quantity,
        'market': marketName,
        'side': side
    } 
    return await post('orders', body);
}

const cancel = async (orderId) => {
    return await deleteCall(`orders/${orderId}`);
}

export {
    login,
    login_by_key,
    loadMarket,
    loadMarkets,
    loadAssets,
    orders,
    cancel,
    getOrders,
}
