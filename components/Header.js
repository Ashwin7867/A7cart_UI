import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import {connect} from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }
    handleChangeText = (text) => {
        this.setState({
            searchText: text
        })
    }
    handleDrawerPress = () => {
        const navigation = this.props.navigation;
        navigation.openDrawer();
    }
    handleCartIconPress = () => {
        const {navigation, route} = this.props;
        navigation.navigate("My Cart")
    }
    render() {
        const txt = this.state.searchText;
        const {num_products} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleDrawerPress}>
                    <Icon name='align-justify'
                        size={21}
                        color="white"
                        style={styles.navButton} />
                </TouchableOpacity>
                <TextInput placeholder="Search"
                    onChangeText={this.handleChangeText}
                    value={txt}
                    style={styles.searchField} />
                <TouchableOpacity onPress = {this.handleCartIconPress}>
                    <View style={styles.iconContainer}>
                        <View style={styles.supContainer}>
                            <Text style={styles.sup}>{num_products}</Text>
                        </View>
                        <Icon name="cart-arrow-down"
                            size={22}
                            color="white"
                            style={styles.cart} />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {basket_products , initial_products} = state.basket;
    const num_basket_products = Object.keys(basket_products).length;
    const num_initial_products = Object.keys(initial_products).length;
    return {
        num_products : parseInt(num_basket_products) + parseInt(num_initial_products)
    }
}

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: 360,
        backgroundColor: 'green',
    },
    navButton: {
        paddingLeft: 15,
    },
    searchField: {
        height: 37,
        width: 220,
        backgroundColor: 'darkgreen',
        borderRadius: 20,
        paddingLeft: 20,
        color: 'white'
    },
    cart: {
        paddingRight: 18,
        lineHeight: 18,
        paddingBottom: 5
    },
    supContainer : {
    },
    sup: {
        marginLeft: 25,
        color: 'black',
        backgroundColor : 'yellow',
        borderRadius : 8,
        textAlign : 'center',
        fontWeight : 'bold'
    }
})