
export function signupApi(signupdata) {
    console.log(signupdata);
    const data = {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        body: JSON.stringify(signupdata),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control' : 'no-cache'
            
        }
    }
    return fetch("https://a7cart.herokuapp.com/api/signup/", data)
    .then(async (response) => {
        const res_data = await response.json();
        const status = response.status;
        console.log(res_data , status);
        return {
            status : status,
            res_data : res_data
        }
    })
        .catch(error => console.log(error))
}

