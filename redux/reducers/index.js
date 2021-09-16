import {combineReducers} from 'redux';

import basket from './basket';
import loginReducer from './loginReducer';
import addressId from './addressId';
import apiProducts from './apiProducts';


export default combineReducers({
    loginReducer, addressId, apiProducts,basket
})