import {ADD_ADDRESS_ID} from '../actionTypes';

export function add_address_id(address_id){
    return {
        type : ADD_ADDRESS_ID,
        payload : {
            address_id : address_id
        }
    }
}