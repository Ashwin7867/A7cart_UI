import React,{Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import OrderList from '../screens/OrderList';
import OrderDetails from '../screens/OrderDetails';

const Stack = createStackNavigator();

export default class MyOrdersNav extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Stack.Navigator initialRouteName = "OrderList">
                <Stack.Screen name = "OrderList" component={OrderList} />
                <Stack.Screen name = "OrderDetails" component = {OrderDetails} />
            </Stack.Navigator>
        )
    }
}