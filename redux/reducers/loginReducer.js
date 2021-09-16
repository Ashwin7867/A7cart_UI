import {REQUEST_LOGIN, RECEIVE_LOGIN, ADD_PHONE, ADD_FIRST_NAME, ADD_LAST_NAME} from '../actionTypes';

const initialstate = {
    status_code : " ",
    session_id : " ",
    phone : "",
    first_name : "",
    last_name : "",
    loading : false
}

export default function loginReducer(state = initialstate, action){
    switch(action.type){
        case REQUEST_LOGIN: {
            return Object.assign({}, state, {
                loading: true
            })
        }
        case RECEIVE_LOGIN:{
            return Object.assign({}, state,{
                loading : false,
                status_code : action.payload.status_code,
                session_id : action.payload.session_id
            })
        }
        case ADD_PHONE:{
            return Object.assign({} , state ,{
                phone : action.payload.phone_num
            })
        }
        case ADD_FIRST_NAME : {
            return Object.assign({}, state , {
                first_name : action.payload.first_name
            })
        }
        case ADD_LAST_NAME :{
            return Object.assign({}, state, {
                last_name : action.payload.last_name
            })
        }
        default :
            return state
    }
}
