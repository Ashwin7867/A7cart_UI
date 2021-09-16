const FAST2SMS_AUTH_KEY = "tBAaL7yY4xPhuM5HDrwmdRkgUof1QbXGq2VlEj6IKF8TcWNZz9xhNoZfytH4PG0qdz761rAC9QXnsvJ2";

export function make_sms_request(message_id , sender_id, numbers , variables , variables_values){
    const req_data = {
        sender_id : sender_id,
        language : "english",
        route : "qt",
        numbers : numbers,
        message : message_id,
        variables : variables,
        variables_values : variables_values
    }
    console.log(req_data)
    const data = {
        method : "POST",
        cache : "no-cache",
        mode: 'same-origin',
        body : JSON.stringify(req_data),
        headers : {
            "Accept": "application/json",
            "Content-Type" : "application/json",
            "Cache-Control" : "no-cache",
            "Authorization" : FAST2SMS_AUTH_KEY
        }
    }
    return fetch("https://www.fast2sms.com/dev/bulk", data)
    .then(response => response.json())
    .catch(error => console.log("There has been an error while sending the sms"))

}