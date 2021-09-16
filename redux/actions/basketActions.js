import { ADD_BASKET_PRODUCT,LOAD_BASKET_INFO, LOAD_BASKET_PRODUCTS, REQUEST_ADD_PRODUCT ,CLEAR_BASKET_AFTER_ORDER} from '../actionTypes';

export function clear_basket(){
    return {
        type : CLEAR_BASKET_AFTER_ORDER
    }
}

function request_add_product(){
    return {
        type : REQUEST_ADD_PRODUCT,
        payload : {
            loading : true
        }
    }
}

function receive_add_products(basket_id, product_id, quantity,basket_price ,status){
    return {
        type : ADD_BASKET_PRODUCT,
        payload : {
            basket_id : basket_id, 
            product_id : product_id, 
            quantity : quantity,
            basket_price: basket_price,
            status : status,
            loading : false
        }
    }
}

export function add_products(session_id, product_data){
    return function(dispatch){
        dispatch(request_add_product());
        const sessionStr = "sessionid=".concat(session_id);
        const data = {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "omit",
            body : JSON.stringify(product_data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'Cookie': sessionStr
                }
        }
        return fetch("https://a7cart.herokuapp.com/api/basket/add-product/",data)
        .then(async (response) => {
            const status = response.status;
            const json_data = await response.json();
            return {
                status : status,
                json_data : json_data,
                product_data : product_data
            }
        })
        .then(({status,json_data, product_data }) => {
            const {id, total_incl_tax_excl_discounts} = json_data;
            const {url, quantity} = product_data;
            const temp = url.split("/");
            const product_id  = temp[temp.length-2];
            return dispatch(receive_add_products(id,product_id,quantity,total_incl_tax_excl_discounts,status))
        })
    }
}

function receive_load_basket_info(basket_id , basket_price){
    return {
        type : LOAD_BASKET_INFO,
        payload : {
            basket_id : basket_id,
            basket_price : basket_price
        }
    }
}

export function load_basket_info(session_id){
    return function(dispatch){
        const sessionStr = "sessionid=".concat(session_id);
        const data = {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'Cookie': sessionStr
            
            }
        }    
        return fetch("https://a7cart.herokuapp.com/api/basket/",data)
        .then(response => response.json())
        .then((responseJson) => {
            const {id, total_incl_tax_excl_discounts} = responseJson;
            return dispatch(receive_load_basket_info(id,total_incl_tax_excl_discounts))
        })    
}
}

function receive_load_basket_products(products){
    return {
        type : LOAD_BASKET_PRODUCTS,
        payload : {
            init_products : products
        }
    }
}

export function load_basket_products(session_id, basket_id){
    return function(dispatch){
        const sessionStr = "sessionid=".concat(session_id);
        const url = "https://a7cart.herokuapp.com/api/baskets/".concat(basket_id,"/lines/");
        const data = {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                'Cookie': sessionStr
            
            }
        }
        return fetch(url, data)
        .then(response => response.json())
        .then((products_arr) => {
            console.log("These products are there from the basketaction action creator function 1", products_arr);
            const new_arr = products_arr.map((pro) => {
                const {product, quantity, price_incl_tax} = pro;
                const temp = product.split("/");
                const product_id = temp[temp.length -2]; 
                return {
                    product_id : parseInt(product_id),
                    quantity : quantity,
                    price_incl_tax : price_incl_tax
                }
            });
            console.log("These products are from the baskeaction functon 2 ", new_arr);
            return dispatch(receive_load_basket_products(new_arr))
        })
    }
}

