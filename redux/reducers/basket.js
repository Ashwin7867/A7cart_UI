import {ADD_BASKET_PRODUCT, LOAD_BASKET_PRODUCTS, LOAD_BASKET_INFO, REQUEST_ADD_PRODUCT, CLEAR_BASKET_AFTER_ORDER} from '../actionTypes';

const initialstate = {
    basket_id : "",
    basket_price : '0',
    basket_products : {},
    initial_products : {},
    loading_basket : false
}

export default function basket(state = initialstate, action){
    switch(action.type){
        case REQUEST_ADD_PRODUCT : {
            return Object.assign({} , state , {
                loading_basket : true
            })
        }
        case ADD_BASKET_PRODUCT : {
            const {basket_id, product_id, quantity, basket_price, status} = action.payload;
            return {
                ...state,
                basket_price : basket_price,
                loading_basket : false,
                basket_products : {
                    ...state.basket_products,
                    [product_id] : {
                        prod_id : product_id,
                        quantity : quantity,
                        status : status
                    }
                }

            }
        }
        case LOAD_BASKET_INFO : {
            const {basket_id , basket_price } = action.payload;
            return {
                ...state,
                basket_id : basket_id,
                basket_price : basket_price
            } 
        }
        case LOAD_BASKET_PRODUCTS : {
            const {init_products} = action.payload;
            const initial_products = {};
            init_products.forEach((prod) => {
                const {product_id, quantity, price_incl_tax} = prod;
                initial_products[parseInt(product_id)] = prod;
            })
            return {
                ...state,
                initial_products : initial_products
            }
        }
        case CLEAR_BASKET_AFTER_ORDER: {
            return Object.assign({}, state ,{
                basket_id : "",
                basket_price : "0",
                basket_products : {},
                initial_products : {}
            })
        }
        default:
            return state
    }
}
