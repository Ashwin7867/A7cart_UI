import AsyncStorage from '@react-native-async-storage/async-storage';

const getSessionId = async () => {
    try {
        const sessionId = await AsyncStorage.getItem('sessionId') || 'none';
        return sessionId
    } catch (error) {
        console.log(error.message)
    }
}

export async function getAddressList() {
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
    return fetch("https://a7cart.herokuapp.com/api/useraddresses/", data)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data
        })
        .catch(error => console.log(error))
}

export async function addAddress(addressdata) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId)
    const data = {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        body: JSON.stringify(addressdata),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/useraddresses/", data)
        .then((response) => {
            const status = response.status;
            const responsejson = response.json();
            const data = {
                status: status,
                jsondata: responsejson
            }
            return data
        })
        .then((data) => {
            const { status, jsondata } = data;
            console.log('This status is from addAddress methid', status);
            return data
        })
        .catch(error => console.log(error))
}

export async function updateAddress(addressdata, addressid) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId)
    const url_text = "https://a7cart.herokuapp.com/api/useraddresses/".concat(addressid, "/");
    const data = {
        method: 'PATCH',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        body: JSON.stringify(addressdata),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    return fetch(url_text, data)
        .then((response) => {
            console.log('This text is priinted from addressapi update address', response.status);
            return response.json()
        })
        .then((data) => {
            console.log(data);
            return data
        })
        .catch(error => console.log(error))
}

export async function deleteAddress(addressId) {
    const sessionId = await getSessionId();
    const sessionStr = "sessionid=".concat(sessionId)
    const url_text = "https://a7cart.herokuapp.com/api/useraddresses/".concat(addressId, "/");
    const data = {
        method: 'DELETE',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Cookie": sessionStr
        }
    }
    return fetch(url_text, data)
        .then((response) => response.status)
        .then((status) => {
            console.log(status);
            return status
        })
        .catch(error => console.log(error))
}
