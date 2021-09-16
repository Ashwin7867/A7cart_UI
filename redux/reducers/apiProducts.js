import {REQUEST_API_PRODUCTS, RECEIVE_API_PRODUCTS, ADD_PRODUCT_TO_BASKET} from '../actionTypes';

const initialstate = {
    loading_apiProducts : false,
    products_by_id : {}
};

export default function apiProducts(state = initialstate, action){
    switch(action.type){
        case REQUEST_API_PRODUCTS : {
            return Object.assign({} , state, {
                loading_apiProducts : true
            })
        }
        case RECEIVE_API_PRODUCTS: {
            const {products_list} = action.payload;
            const temp = {};
            products_list.forEach((product) => {
                const {id } = product;
                temp[id] = product;
                return true
            })
            return {
                ...state,
                loading_apiProducts : false,
                products_by_id : temp
            } 
        }
        case ADD_PRODUCT_TO_BASKET:{
            const {product_id , quantity} = action.payload;
            return {
                ...state,
                products_by_id : {
                    ...state.products_by_id,
                    [product_id] : {
                        ...state.products_by_id[product_id],
                        is_product_added_to_basket : true,
                        product_added_to_basket_qty : quantity
                    }
                }
            }
        }
        default:
            return state
    }
}
