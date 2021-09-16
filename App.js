import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider } from 'react-redux';
import store from './redux/store';

import CartScreen from './screens/CartScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import LoginScreen from './screens/LoginScreen';

import MyDrawer from './navigation/MyDrawer';
import MyAddressNav from './navigation/MyAddressNav';
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store = {store}>
      <NavigationContainer>
        <StatusBar height={15} backgroundColor="black" />
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="My Drawer" component={MyDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="My Cart" component={CartScreen} />
          <Stack.Screen name = "MyAddress" component = {MyAddressNav} />
          <Stack.Screen name="My Order" component={OrderDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
}



