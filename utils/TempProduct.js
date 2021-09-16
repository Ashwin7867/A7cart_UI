import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const tomato = require('../assets/images/tomato.jpeg');

export default class TempProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 5,
            isAddPressed: false,
            isConfirmPressed: false
        }
    }
    handlePlusPress = () => {
        const inc_qty = 2;
        const oldquantity = this.state.quantity;
        this.setState({
            quantity: parseInt(oldquantity) + parseInt(inc_qty)
        })
    }
    handleMinusPress = () => {
        const inc_qty = 2;
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
    handleConfirmPress = () => {
        this.setState({
            isConfirmPressed: true
        })
    }
    handleCancelPress = () => {
        this.setState({
            isAddPressed: false
        })
    }
    render() {
        const { isAddPressed, isConfirmPressed, quantity } = this.state;
        return (
            <View style={styles.productContainer}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.image} source={tomato} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{'Tomato'}</Text>
                    <Text style={styles.priceContainer}>
                        <Text style={styles.price}>{''.concat('Rs.', " ", '30')}</Text>
                        <Text style={styles.dark}>{''.concat(" / ", 'Kg')}</Text>
                    </Text>
                    <Text style={styles.qtyContainer}>
                        <Text style={styles.faint}>{'Min '}</Text>
                        <Text style={styles.dark}>{''.concat('5', " ", 'Kg')}</Text>
                        <Text style={styles.faint}>{''.concat(' / Qty ')}</Text>
                        <Text style={styles.dark}>{''.concat("+", '2', " ", 'Kg')}</Text>
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
                                <Text style={styles.qty}>{"".concat(this.state.quantity, " ", 'Kg')}</Text>
                                <TouchableOpacity style={styles.incButton} onPress={this.handlePlusPress}>
                                    <Icon name="plus-circle" size={31} style={styles.plusButton} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ccButtonContainer}>
                                <TouchableOpacity style={styles.confirmButtonContainer}
                                    onPress={this.handleConfirmPress}>
                                    <Icon name="check" size={23} style={styles.confirmButton} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButtonContainer}
                                    onPress={this.handleCancelPress} >
                                    <Icon name="remove" size={23} style={styles.cancelButton} />
                                </TouchableOpacity>
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
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 40,
        marginLeft: 30
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