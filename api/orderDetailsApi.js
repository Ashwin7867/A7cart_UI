export async function getOrderProducts(lines_url) {
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
    return fetch(lines_url, data)
        .then((response) => response.json())
        .catch(error => console.log(error))
}

export async function getOrderList() {
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
    return fetch("https://a7cart.herokuapp.com/api/orders/", data)
        .then((response) => response.json())
        .catch(error => console.log(error))
}