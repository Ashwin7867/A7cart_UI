import AsyncStorage from '@react-native-async-storage/async-storage';

const saveBasketId = async basketId => {
    try {
        await AsyncStorage.setItem('basketId', basketId)
    } catch (error) {
        console.log(error)
    }
}

const getBasketId = async () => {
    try {
        const basketId = await AsyncStorage.getItem('basketId');
        return basketId
    } catch (error) {
        console.log(error.message)
    }
}

const getSessionId = async () => {
    try {
        const sessionId = await AsyncStorage.getItem('sessionId') || 'none';
        return sessionId
    } catch (error) {
        console.log(error.message)
    }
}

export async function addProduct(productData) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId);
    console.log('This sessionid is from basketapi', sessionStr);
    const data = {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        body: JSON.stringify(productData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Cookie': sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/basket/add-product/", data)
        .then((response) => {
            console.log(response.headers);
            return response.json()
        })
        .then((responseJson) => {
            console.log(responseJson);
            return responseJson
        })
        .catch((error) => console.log(error))
}

export async function getTotalBasketPrice() {
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
        .then((responseJson) => {
            const totalBasketPrice = responseJson['total_incl_tax'];
            return totalBasketPrice.toString()
        })
        .catch(error => console.log(error))
}