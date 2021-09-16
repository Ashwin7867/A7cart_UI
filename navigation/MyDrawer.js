import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerSupport from '../components/CustomerSupport';
import RateUs from '../components/RateUs';
import Share from '../components/Share';
import AboutUs from '../components/AboutUs';

import HomeScreen from '../screens/HomeScreen';
import Profile from '../components/Profile';

import MyAddressNav from './MyAddressNav';
import MyOrdersNav from './MyOrdersNav';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="HomeScreen">
            <Drawer.Screen name="Home" 
                        component={HomeScreen}
                        initialParams = {{should_reload : false}}  
                        options={{headerShown : false}} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="MyAddress" component={MyAddressNav} />
            <Drawer.Screen name="My Orders" component={MyOrdersNav} />
            <Drawer.Screen name="Customer Support" component={CustomerSupport} />
            <Drawer.Screen name="Rate Us" component={RateUs} />
            <Drawer.Screen name="Share" component={Share} />
            <Drawer.Screen name="About Us" component={AboutUs} />
        </Drawer.Navigator>
    )
}