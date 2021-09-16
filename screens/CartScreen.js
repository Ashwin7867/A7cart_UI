import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CartProduct from '../components/CartProduct';

import {connect} from 'react-redux';

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            basket_price : " ",
            num_products : " ",
        }
    }
    handleBackPress =() => {
        const {navigation} = this.props;
        navigation.navigate("Home");
        return true
    }
    async componentDidMount() {
        const {basket_id, basket_price, initial_products, basket_products, products_by_id} = this.props;
        const initial_products_id_arr = Object.keys(initial_products);
        const basket_products_id_arr = Object.keys(basket_products);
        const num_basket_products = parseInt(initial_products_id_arr.length) + parseInt(basket_products_id_arr.length);
        const cart_products = [];
        console.log('initial_products_id_arr', initial_products_id_arr);
        console.log('bakset products id arr', basket_products_id_arr);
        console.log('initial products', initial_products);
        console.log('basket_products', basket_products);
        console.log('products by id', products_by_id);
        if(!!initial_products_id_arr && initial_products_id_arr.length){
            initial_products_id_arr.forEach((id) => {
                const {product_id , quantity, price_incl_tax} = initial_products[id.toString()];
                const {url ,title, product_class,image_name, inc_qty, min_qty, qty_unit, price_url, availability_url } = products_by_id[id.toString()];
                const data = {
                    product_id : product_id,
                    url : url,
                    title : title,
                    product_class : product_class,
                    image_name : image_name,
                    inc_qty : inc_qty,
                    min_qty : min_qty,
                    qty_unit : qty_unit,
                    quantity : quantity,
                    price_incl_tax : price_incl_tax,
                    price_url : price_url,
                    availability_url : availability_url
                }
                cart_products.push(data)
                return true
            })
        }
        if(!!basket_products_id_arr && basket_products_id_arr.length){
            basket_products_id_arr.forEach((id) => {
                const {prod_id , quantity } = basket_products[id.toString()];
                const {url ,title, product_class,image_name, inc_qty, min_qty, qty_unit, price_url, availability_url } = products_by_id[id.toString()];
                const data = {
                    product_id : prod_id,
                    url : url,
                    title : title,
                    product_class : product_class,
                    image_name : image_name,
                    inc_qty : inc_qty,
                    min_qty : min_qty,
                    qty_unit : qty_unit,
                    quantity : quantity,
                    price_incl_tax : "",
                    price_url : price_url,
                    availability_url : availability_url
                }
                cart_products.push(data)
                return true
            })
        }
        this.setState({
            products : cart_products,
            basket_price : basket_price,
            num_products : num_basket_products    
        })
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
    }

    handlePressArrow = () => {
        const {navigation , route} = this.props;
        navigation.navigate("MyAddress", {
            screen : "AddressList",
            params : {show_arrow: true}
        })
    }
    render() {
        const { products, basket_price, num_products} = this.state;
        const prd = products.map((product, index) => (
            <CartProduct key = {index}
                product_info = {product} />
        ))
        return (
                <View style={styles.container}>       
                    <View style={styles.status}>
                        <Text style={styles.text}>
                            {''.concat("  ITEMS IN CART (", num_products.toString(), ")")}
                        </Text>
                    </View>
                <ScrollView style = {styles.cart_products_lst}>
                    {prd}
                </ScrollView>
                <View style={styles.nav_down}>
                    <Text style={styles.text}>{''.concat("   PLACE ORDER: Rs ", basket_price.toString())}</Text>
                    <TouchableOpacity style={styles.navButton}
                        onPress={this.handlePressArrow}>
                        <Icon name="long-arrow-alt-right"
                            size={30}
                            color="darkgreen" />
                    </TouchableOpacity>
                </View>         
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {basket_id, basket_price, basket_products, initial_products} = state.basket;
    const {products_by_id} = state.apiProducts;
    return {
        basket_id : basket_id,
        basket_price : basket_price,
        basket_products : basket_products,
        initial_products : initial_products,
        products_by_id : products_by_id
    }
}

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10
    },
    status: {
        height: 34,
        width: 355,
        backgroundColor: 'lightgray',
        marginLeft: 1,
        marginBottom: 1
    },
    text: {
        fontSize: 15,
    },
    cart_products_lst : {marginBottom : 50},
    productlst: {
    },
    nav_down: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderTopColor: 'darkgreen',
        borderTopWidth: 2,
        height: 45,
        width: 355,
        position: 'absolute',
        bottom: 0
    },
    text: {
        fontSize: 16,
        color: 'darkgreen',
        paddingTop: 10
    },
    navButton: {
        marginRight: 20
    },
    icon: {}
})