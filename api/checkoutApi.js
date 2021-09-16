
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSessionId = async () => {
    try {
        const sessionId = await AsyncStorage.getItem('sessionId') || 'none';
        return sessionId
    } catch (error) {
        console.log(error.message)
    }
}

export async function getBasketInfo() {
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

export async function getShippingMethod() {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const data = {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/basket/shipping-methods/", data)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data[0]['code']
        })
        .catch(error => console.log(error))
}

export async function getAddressInfo(addressId) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const data = {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    const url = "https://a7cart.herokuapp.com/api/useraddresses/".concat(addressId, "/");
    return fetch(url, data)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data
        })
        .catch(error => console.log(error))
}

export async function confirmCheckout(request_data) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    const data = {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "omit",
        body: JSON.stringify(request_data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/checkout/", data)
        .then(async (response) => {
            const status = response.status;
            const responseJson = await response.json();
            return {
                status: status,
                json_data: responseJson
            }
        })
        .catch(error => console.log(error))
}