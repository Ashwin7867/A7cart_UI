import React , {Component} from 'react';
import {View ,StyleSheet ,SafeAreaView, Image} from 'react-native';
import {NavigatorContainer} from '@react-navigation/material-top-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Login from '../components/Login';
import Signup from '../components/Signup';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image source = {require('../assets/a7.png')}
                             style = {styles.image} />
                </View>
                
                    <Tab.Navigator initialRouteName = "Login"
                                    style = {styles.tabContainer}>
                        <Tab.Screen name = "Login" component = {Login} />
                        <Tab.Screen name = "Signup" component = {Signup} />
                    </Tab.Navigator>
            
            </SafeAreaView>
        )
    }
} 

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'center'

    },
    imageContainer : {
        marginTop : 50
    },
    image : {
        height : 50,
        width : 50
    },
    tabContainer : {
        height : 50,
        width : 355,
        marginTop : 10,
        marginBottom : 30,
    }
})