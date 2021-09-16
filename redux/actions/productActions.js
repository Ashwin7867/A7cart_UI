import {REQUEST_API_PRODUCTS, RECEIVE_API_PRODUCTS, ADD_PRODUCT_TO_BASKET} from '../actionTypes';

function request_api_products(){
    return {
        type : REQUEST_API_PRODUCTS,
        payload : {
            loading :true
        }
    }
}

function receive_api_products(products_arr){
    return {
        type : RECEIVE_API_PRODUCTS,
        payload : {
            loading : false,
            products_list : products_arr
        }
    }
}

export function add_product_to_basket(product_id, quantity){
    return {
        type : ADD_PRODUCT_TO_BASKET,
        payload : {
            product_id : product_id,
            quantity : quantity
        }
    }
}

export function get_api_products(session_id){
    return function(dispatch){
        dispatch(request_api_products());
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
        return fetch("https://a7cart.herokuapp.com/api/products/", data)
        .then((response) => response.json())
        .then(async (json_arr) => {
            const res_arr = [];
            for (let obj in json_arr){
                    const {id, url, title, product_class,images,description,attributes,price,availability} = json_arr[obj];
                    const imageurl = images[0]['original'];
                    const temp = imageurl.split('/');
                    const imgname = temp[temp.length - 1];
                    const finalimgname = imgname.split('.')[0];
                    const inc_qty = attributes[0]['value'];
                    const min_qty = attributes[1]['value'];
                    const qty_unit = attributes[2]['value'];
                    const data = {
                        id : id,
                        url : url,
                        title : title,
                        product_class : product_class,
                        description : description,
                        image_name : finalimgname,
                        inc_qty : inc_qty,
                        min_qty : min_qty,
                        qty_unit : qty_unit,
                        price_url : price,
                        availability_url : availability,
                        is_product_added_to_basket : false,
                        product_added_to_basket_qty : " "
                    }
                    res_arr.push(data)
            }
            return res_arr
        })
        .then((res_arr) => dispatch(receive_api_products(res_arr)))
    }
}