import React, { Component } from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import NewAddressScreen from '../screens/NewAddressScreen';
import AddressListScreen from '../screens/AddressListScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import AddressMap from '../components/AddressMap';

const  Stack = createStackNavigator();

export default class MyAddressNav extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <Stack.Navigator initialRouteName = "AddressList">
                    <Stack.Screen name="AddressList" 
                            component={AddressListScreen}
                            initialParams = {{show_arrow : false}} />
                    <Stack.Screen name = "NewAddress" component={NewAddressScreen} />
                    <Stack.Screen name = "AddressMap" component = {AddressMap} />
                    <Stack.Screen name = "EditAddress" component = {EditAddressScreen} />
                </Stack.Navigator>
        )
    }
}