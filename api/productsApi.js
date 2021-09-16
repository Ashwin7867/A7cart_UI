export async function productPrice(url) {
    const data = {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    return fetch(url, data)
        .then((response) => response.json())
        .then((responseJson) => {
            const price = responseJson['incl_tax'];
            const currency = responseJson['currency'];
            const data = {
                product_price: price,
                currency: currency
            }
            return data
        })
        .catch(error => console.log(error))
}

export async function productAvailability(url) {
    const data = {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    return fetch(url, data)
        .then((response) => response.json())
        .then((responseJson) => {
            const is_available = responseJson['is_available_to_buy'];
            const num_available = responseJson['num_available'];
            const data = {
                is_available: is_available,
                num_available: num_available
            }
            return data
        })
        .catch(error => console.log(error))
}