import React, { Component } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';

import Product from './Product';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    renderItem = ({ item: { id, url, title,product_class,description, image_name,inc_qty,min_qty,qty_unit,price_url,availability_url, is_product_added_to_basket, product_added_to_basket_qty } }) => {
        return (
            <Product id={id}
                url={url}
                title={title}
                inc_qty={inc_qty}
                min_qty={min_qty}
                qty_unit={qty_unit}
                product_class = {product_class}
                description = {description}
                image_name = {image_name}
                price_url = {price_url}
                availability_url ={availability_url}
                is_product_added_to_basket = {is_product_added_to_basket}
                product_added_to_basket_qty = {product_added_to_basket_qty}
                />
        )
    }
    render() {
        const { products_arr } = this.props;
        console.log('These are products object from productlist', products_arr);
        return (
            <SafeAreaView style={styles.flatlistcontainer}>
                <FlatList data={products_arr}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => 'key' + index}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    flatlistcontainer: {
        paddingBottom: 48,
    }
})