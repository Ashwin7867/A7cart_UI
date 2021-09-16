import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, BackHandler, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import VegProductLst from '../components/VegProductLst';
import FruitProLst from '../components/FruitProLst';
import Header from '../components/Header';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {connect} from 'react-redux';
import {load_basket_info, load_basket_products } from '../redux/actions/basketActions';
import {get_api_products, add_product_to_basket} from '../redux/actions/productActions';

const Tab = createMaterialTopTabNavigator();

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the app?', [{
                text : 'Cancel',
                onPress : () => console.log('Cancel Pressed'),
                style : 'cancel'
            }, {
                text : 'Ok',
                onPress : () => BackHandler.exitApp()
            }],{
                cancelable : false
            }
        )
        return true
    }
    async componentDidMount(){
        await this.doApiCall();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
    }
    doApiCall = async () => {
        const {session_id} = this.props;
        await this.props.load_basket_info(session_id);
        const {basket_id} = this.props;
        if(basket_id){
            console.log("in baskset", basket_id)
            await this.props.load_basket_products(session_id ,basket_id);
            await this.props.get_api_products(session_id);
        }
    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)
    }
    handleForwardPress = () => {
        const { navigation } = this.props;
        navigation.navigate('My Cart')
    }
    render() {
        const { navigation, route } = this.props;
        const {basket_price, loading_basket, loading_apiProducts} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <Header navigation={navigation} />
                <Tab.Navigator initialRouteName="Vegetables"
                    style={styles.tabContainer}>
                    <Tab.Screen name="Vegetables" component={VegProductLst} />
                    <Tab.Screen name="Fruits" component={FruitProLst} />
                </Tab.Navigator>
                <SafeAreaView style={styles.navBottom}>
                    <Text style={styles.text}>{''.concat("TOTAL : Rs ", basket_price)}</Text>
                    <TouchableOpacity style={styles.navButton}
                        onPress={this.handleForwardPress}>
                        <Icon name="arrow-right"
                            size={25}
                            color='darkgreen' />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('State from homescreen', state)
    const {basket_price, basket_id , loading_basket} = state.basket;
    const {session_id} = state.loginReducer;
    const {loading_apiProducts} = state.apiProducts;
    return {
        basket_price : basket_price,
        session_id : session_id,
        basket_id : basket_id,
        loading_basket : loading_basket,
        loading_apiProducts : loading_apiProducts
    }
}

const mapDispatchToProps =  {
    load_basket_info,
    load_basket_products,
    get_api_products,
    add_product_to_basket
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    },
    tabContainer: {
        width: 355,
        height: 50,
        color: 'blue'
    },
    navBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderTopColor: 'darkgreen',
        borderTopWidth: 2,
        height: 45,
        width: 355,
        bottom: 0,
        position: 'absolute'
    },
    text: {
        fontSize: 17,
        color: 'darkgreen',
        paddingTop: 10,
        paddingLeft: 10
    },
    navButton: {
        marginRight: 10,
        marginTop: 5
    },

})