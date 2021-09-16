import {ADD_ADDRESS_ID} from '../actionTypes';

const initialstate = "";

export default function addressId(state = initialstate, action){
    switch(action.type){
        case ADD_ADDRESS_ID: {
            return action.payload.address_id
        }
        default:
            return state
    }
}