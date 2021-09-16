import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class OrderInfo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {del_date , sub_total, total} = this.props ;
        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.orderheader1}>{'Delivery Date'}</Text>
                    <Text style = {styles.orderheader2}>{del_date}</Text>
                </View>
                <View style= {styles.headingContainer}>
                    <Text style = {styles.heading}>{'ORDER SUMMARY'}</Text>
                </View>
                <View style = {styles.subtotalContainer}>
                    <Text style = {styles.subtotal1}>{'Sub Total'}</Text>
                    <Text style = {styles.subtotal2}>{''.concat("Rs. ", sub_total)}</Text>
                </View>
                <View style = {styles.totalContainer}>
                    <Text style = {styles.total1}>{'Total'}</Text>
                    <Text style = {styles.total2}>{''.concat("Rs. ", total)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'column',
        justifyContent :  'flex-start',
        alignItems :'stretch',
        height : 126,
        width: 358,
        borderWidth : 2,
        borderColor : 'lightgray',
    },
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor : 'darkgreen',
        height : 35
    },
    orderheader1 :{
        color : 'white',
        fontSize : 17,
        paddingLeft : 7
    },
    orderheader2 : {
        color : 'white',
        fontSize : 17,
        paddingRight : 7
    },
    headingContainer : {
        backgroundColor : 'lightgray',
        height : 30,
    },
    heading : {
        paddingTop : 5,
        paddingLeft : 7
    },
    subtotalContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'flex-start',
        height : 25
    },
    subtotal1 : {
        paddingLeft : 6,
        paddingTop : 5,
        fontSize : 16
    },
    subtotal2 : {
        paddingTop : 5,
        paddingRight : 6,
        fontSize : 16
    },
    totalContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'flex-start',
        marginTop : 4
    },
    total1 : {
        fontWeight :'bold',
        paddingLeft : 6,
        paddingTop :5,
        fontSize : 16
    },
    total2 : {
        fontWeight :'bold',
        paddingRight : 6,
        paddingTop : 5,
        fontSize : 16
    }
})