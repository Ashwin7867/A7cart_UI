import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import getImageForProduct from '../utils/getImageForProduct';

import { productPrice, productAvailability } from '../api/productsApi';

export default class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local_quantity : " ",
            product_price: " ",
            is_available : " ",
            num_available : " "
        }
    }
    async componentDidMount() {
        const {price_url, availability_url, quantity} = this.props.product_info
        const {is_available, num_available} = await productAvailability(availability_url)
        const { product_price,currency} = await productPrice(price_url)
        this.setState({
            local_quantity : quantity,
            product_price : product_price,
            is_available : is_available,
            num_available : num_available, 
        })
    }
    handleMinusPress = () => {
        const { qty_inc, min_qty, quantity } = this.state;
        const new_quantity = parseInt(quantity) - parseInt(qty_inc);
        if (new_quantity < parseInt(min_qty)) {
            this.setState({
                quantity: min_qty
            })
        } else {
            this.setState({
                quantity: new_quantity
            })
        }
    }
    handlePlusPress = () => {
        const { qty_inc, min_qty, quantity } = this.state;
        const new_quantity = parseInt(quantity) + parseInt(qty_inc);
        this.setState({
            quantity: new_quantity
        })
    }
    render() {
        const { product_price, is_available, num_available} = this.state;
        const { title, product_class,image_name, inc_qty, min_qty, quantity, qty_unit, price_incl_tax} = this.props.product_info;
        const final_price_incl_tax = price_incl_tax ? price_incl_tax : parseInt(product_price) * parseInt(quantity);
        return (
            <View style={styles.productContainer}>
                <TouchableOpacity style={styles.imageContainer}
                    onPress={this.handleImagePress}>
                    <Image style={styles.image} source={getImageForProduct(image_name)} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{title}</Text>
                    <Text style={styles.priceContainer}>
                        <Text style={styles.price}>{''.concat("Rs ", product_price)}</Text>
                        <Text style={styles.dark}>{''.concat(" / ", qty_unit)}</Text>
                    </Text>
                    <Text style={styles.orderQtyContainer}>
                        {''.concat(product_price, " * ",quantity," = ", final_price_incl_tax)}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.decButton}
                        onPress={this.handleMinusPress}>
                        <Icon name="minus-circle" size={31} style={styles.minusButton} />
                    </TouchableOpacity>
                    <Text style={styles.qty}>{''.concat(quantity, " ", qty_unit)}</Text>
                    <TouchableOpacity style={styles.incButton}
                        onPress={this.handlePlusPress}>
                        <Icon name="plus-circle" size={31} style={styles.plusButton} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: 107,
        width: 357,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 1.5
    },
    imageContainer: {
        paddingTop: 24,
        paddingLeft: 2,
        paddingRight: 10
    },
    image: {
        height: 60,
        width: 80,
    },
    productInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingLeft: 7
    },
    productName: {
        fontSize: 17.5,
        fontWeight: '100',
        color: 'black'
    },
    priceContainer: {
        paddingTop: 3,
        fontSize: 15,
        paddingBottom: 5
    },
    orderQtyContainer: {
        fontSize: 15,
        color: 'gray'

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginLeft: 55,
        alignSelf: 'center',
        marginRight : 15
    },
    decButton: {},
    minusButton: { color: 'gray' },
    incButton: {},
    plusButton: { color: 'gray' },
    faint: {
        color: 'gray'
    },
    price: {
        color: 'teal'
    },
    dark: {

    }

})