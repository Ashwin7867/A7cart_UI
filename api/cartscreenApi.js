import AsyncStorage from '@react-native-async-storage/async-storage';

const getSessionId = async () => {
    try {
        const sessionId = await AsyncStorage.getItem('sessionId') || 'none';
        return sessionId
    } catch (error) {
        console.log(error.message)
    }
}

async function getBasketInfo() {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const data = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Cookie': sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/basket/", data)
        .then((response) => response.json())
        .catch(error => console.log(error))
}

export async function getCartProducts() {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const basketInfo = await getBasketInfo();
    const lines_url = basketInfo['lines'];
    const data = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Cookie': sessionStr
        }
    }
    return fetch(lines_url, data)
        .then((response) => response.json())
        .catch(error => console.log(error))
}

export async function getProductInfo(product_url) {
    const data = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    return fetch(product_url, data)
        .then((response) => response.json())
        .catch(error => console.log(error))
}

export async function getBasketPrice() {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const data = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Cookie': sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/basket/", data)
        .then((response) => response.json())
        .then((jsondata) => jsondata['total_incl_tax_excl_discounts'])
        .catch(error => console.log(error))
}