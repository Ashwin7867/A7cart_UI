import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import ProductList from './ProductList';

import {connect} from 'react-redux';

class VegProductLst extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { products_arr,initial_products,initial_products_id } = this.props;
        const product_lst = !!products_arr && products_arr.length  ? (products_arr.filter((prod) => {
            const { id, product_class } = prod;
            if(initial_products_id.indexOf(id.toString()) != -1){
                const {product_id, quantity , price_incl_tax} = initial_products[id.toString()];
                prod['is_product_added_to_basket'] = true;
                prod['product_added_to_basket_qty'] = quantity;
            }else{
                prod['is_product_added_to_basket'] = false,
                prod['product_added_to_basket'] = ""
            }
            if(product_class === "vegetables"){
                return prod
            }    
            })
        ):null;   
        return (
            <View>
                <ProductList products_arr = {product_lst} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {products_by_id} = state.apiProducts;
    const {initial_products} = state.basket;
    const products_id = Object.keys(products_by_id);
    const initial_products_id = Object.keys(initial_products);
    const product_lst = products_id && products_id.length ? products_id.map((id) => (products_by_id ? {...products_by_id[id]} : null)) : null; 
    return {
        products_arr : product_lst,
        initial_products_id : initial_products_id,
        initial_products : initial_products
    }
}

export default connect(
    mapStateToProps
)(VegProductLst)

