import 'babel-polyfill';
import { RECEIVE_LOGIN, REQUEST_LOGIN, ADD_PHONE, ADD_FIRST_NAME, ADD_LAST_NAME } from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSessionId = async sessionid => {
    try {
        await AsyncStorage.setItem('sessionId', sessionid)
    } catch (error) {
        console.log(error.message)
    }
}

export function add_phone(phone) {
    return {
        type: ADD_PHONE,
        payload: {
            phone_num: phone
        }
    }
}

export function add_first_name(first_name) {
    return {
        type: ADD_FIRST_NAME,
        payload: {
            first_name: first_name
        }
    }
}

export function add_last_name(last_name) {
    return {
        type: ADD_LAST_NAME,
        payload: {
            last_name: last_name
        }
    }
}


function request_login() {
    return {
        type: REQUEST_LOGIN,
        payload: {
            loading: true
        }
    }
}

function receive_login(status, session_id) {
    return {
        type: RECEIVE_LOGIN,
        payload: {
            loading: false,
            status_code: status,
            session_id: session_id
        }
    }
}

export function action_login(login_data) {
    return function (dispatch) {
        dispatch(request_login());
        const data = {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "omit",
            body: JSON.stringify(login_data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        }
        return fetch("https://a7cart.herokuapp.com/api/login/", data)
            .then(response => {
                const str_ = response.headers.map['set-cookie'];
                const sessionstr = str_.split(";")[0];
                const sessionId = sessionstr.slice(10);
                const status = parseInt(response.status);
                const responsedata = {
                    status: status,
                    sessionId: sessionId
                }
                return responsedata
            })
            .then((responseData) => {
                const { status, sessionId } = responseData;
                saveSessionId(sessionId)
                return responseData
            })
            .then((data) => dispatch(receive_login(data.status, data.sessionId)))
    }
}