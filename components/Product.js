import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity ,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import getImageForProduct from '../utils/getImageForProduct';
import { productPrice, productAvailability } from '../api/productsApi';
//import { addProduct } from '../api/basketApi';

import {connect} from "react-redux";
import {add_products} from '../redux/actions/basketActions';
import {add_product_to_basket} from '../redux/actions/productActions';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            isAddPressed: false,
            isConfirmPressed : false,
            product_price : '',
            currency : '',
            is_product_available : true,
            num_product_available  :'',
            loading : false
        }
    }
    async componentDidMount() {
        const {id, price_url , availability_url, min_qty , is_product_added_to_basket,basket_products, product_added_to_basket_qty} = this.props;
        const {product_price, currency } = await productPrice(price_url);
        const {is_available, num_available} = await productAvailability(availability_url);
        this.setState({
            product_price : product_price,
            currency : currency,
            is_product_available : is_available,
            num_product_available : num_available
        })
        if(is_product_added_to_basket){
            this.setState({
                isConfirmPressed : true,
                quantity : product_added_to_basket_qty
            })
        }else{
            this.setState({
                quantity : min_qty
            })
        }
    }
    handlePlusPress = () => {
        const { inc_qty } = this.props;
        const oldquantity = this.state.quantity;
        this.setState({
            quantity: parseInt(oldquantity) + parseInt(inc_qty)
        })
    }
    handleMinusPress = () => {
        const { inc_qty } = this.props;
        const oldquantity = this.state.quantity;
        this.setState({
            quantity: parseInt(oldquantity) - parseInt(inc_qty)
        })
    }
    handleAddButtonPress = () => {
        this.setState({
            isAddPressed: true
        })
    }
    handleConfirmPress = async () => {
        const { id,  url } = this.props;
        const data = {
            url: url,
            quantity: this.state.quantity
        }
        const {session_id} = this.props;
        this.setState({
            loading : true
        })
        await this.props.add_products(session_id, data);
        const {basket_products} = this.props;
        if (basket_products[id.toString()]['status'] == '200') {
            this.setState({
                isConfirmPressed : true,
                loading : false
            })
            this.props.add_product_to_basket(id, this.state.quantity);
        }
    }
    handleCancelPress = () => {
        this.setState({
            isAddPressed: false
        })
    }
    render() {
        const { id, url,title,product_class, description,image_name ,inc_qty, min_qty, qty_unit, products_by_id} = this.props;
        const {loading, quantity, isAddPressed, isConfirmPressed, product_price, currency,is_product_available ,num_product_available } = this.state; 
        return (
            <View style={styles.productContainer}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.image} source={getImageForProduct(image_name)} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{title}</Text>
                    <Text style={styles.priceContainer}>
                        <Text style={styles.price}>{''.concat('Rs.', " ", product_price)}</Text>
                        <Text style={styles.dark}>{''.concat(" / ", qty_unit)}</Text>
                    </Text>
                    <Text style={styles.qtyContainer}>
                        <Text style={styles.faint}>{'Min '}</Text>
                        <Text style={styles.dark}>{''.concat(min_qty, " ", qty_unit)}</Text>
                        <Text style={styles.faint}>{''.concat(' / Qty ')}</Text>
                        <Text style={styles.dark}>{''.concat("+", inc_qty, " ", qty_unit)}</Text>
                    </Text>
                </View>
                <View>
                    {!isAddPressed && !isConfirmPressed &&
                        <TouchableOpacity style={styles.addButton} onPress={this.handleAddButtonPress}>
                            <Text style={styles.addText}>{'Add'}</Text>
                        </TouchableOpacity>
                    }
                    {!!isAddPressed && !isConfirmPressed && 
                        <View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.decButton} onPress={this.handleMinusPress}>
                                    <Icon name="minus-circle" size={31} style={styles.minusButton} />
                                </TouchableOpacity>
                                <Text style={styles.qty}>{"".concat(quantity, " ", qty_unit)}</Text>
                                <TouchableOpacity style={styles.incButton} onPress={this.handlePlusPress}>
                                    <Icon name="plus-circle" size={31} style={styles.plusButton} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ccButtonContainer}>
                                {!!loading && <ActivityIndicator size = "small" color = "green" style = {{marginLeft : 50, marginTop : 15}}/>}
                                {!loading && <TouchableOpacity style={styles.confirmButtonContainer}
                                    onPress={this.handleConfirmPress}>
                                    <Icon name="check" size={23} style={styles.confirmButton} />
                                </TouchableOpacity>}
                                {!loading && <TouchableOpacity style={styles.cancelButtonContainer}
                                    onPress={this.handleCancelPress} >
                                    <Icon name="remove" size={23} style={styles.cancelButton} />
                                </TouchableOpacity>}
                            </View>
                        </View>
                    }
                    {
                        !!isConfirmPressed && 
                        <View>
                            <TouchableOpacity style={styles.confirmed1Container}>
                                <Text style={styles.confirmed1}>{'Product Added'}</Text>
                            </TouchableOpacity>
                            <View style={styles.confirmed2Container} >
                                <Text style={styles.confirmed21}>{'Quantity : '}</Text>
                                <Text style={styles.confirmed22}>{''.concat(quantity, 'Kg')}</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {session_id} = state.loginReducer;
    const {basket_id, basket_price, basket_products, initial_products} = state.basket;
    return {
        session_id : session_id,
        basket_products : basket_products,
        initial_products : initial_products
    }
}

const mapDispatchToProps = {
    add_products,
    add_product_to_basket
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product)



const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: 120,
        width: 357,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginLeft: 2,
        marginRight: 2
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
    qtyContainer: {
        fontSize: 15,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 17,
        marginTop: 20
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
    addButton: {
        backgroundColor: 'green',
        height: 20,
        width: 50,
        alignItems : 'center',
        borderRadius: 4,
        marginTop: 40,
        marginLeft : 30
    },
    addText: {
        color: 'white',
        fontWeight: 'bold'
    },
    ccButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    confirmButtonContainer: {
        height: 25,
        marginLeft: 25,
        marginTop: 7,
        borderRadius: 3,
        backgroundColor: 'green'
    },
    cancelButtonContainer: {
        height: 25,
        width: 25,
        marginLeft: 15,
        marginTop: 7,
        borderRadius: 3,
        backgroundColor: 'green'
    },
    confirmButton: {
        color: 'white',
        marginLeft: 1
    },
    cancelButton: {
        color: 'white',
        marginLeft: 2
    },
    confirmed1Container: {
        height: 20,
        width: 105,
        backgroundColor: 'green',
        borderRadius: 3,
        alignItems: 'center',
        marginTop: 20
    },
    confirmed1: {
        color: 'white',
        fontWeight: 'bold'
    },
    confirmed2Container: {
        flexDirection: 'row',
        borderColor: 'green',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 5
    },
    confirmed21: {
        fontWeight: 'bold'
    },
    confirmed22: {
        fontWeight: 'bold',
        color: 'green'
    }
})