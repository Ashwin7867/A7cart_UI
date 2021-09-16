import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Order extends Component{
    constructor(props){
        super(props);
        this.state = {order_date_str : ''}
    }
    componentDidMount(){
        const {order_date} = this.props;
        const temp_arr = order_date.split("-");
        const year = temp_arr[0];
        const month = parseInt(temp_arr[1]);
        const day = temp_arr[2].slice(0,2);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const order_date_str = " ".concat(day,"-",months[month-1],"-",year)
        this.setState({
            order_date_str : order_date_str
        })

    }
    handleViewPress = () => {
        const {order_no,order_date,order_price,order_url,lines_url,navigation} = this.props;
        const {order_date_str} = this.state;
        navigation.navigate("OrderDetails", {
            order_no : order_no,
            order_date : order_date_str,
            order_price : order_price,
            order_url : order_url,
            lines_url : lines_url
        })

    }
    render(){
        const {order_no,order_date,order_price,order_url,lines_url,navigation} = this.props;
        const {order_date_str} = this.state;
        return (
            <View style = {styles.toper}>
            <View style = {styles.container}>
                <View style = {styles.heading}>
                    <View style = {styles.heading1Container}>
                        <Text style = {styles.heading1}>{"ORDER CONFIRMED"}</Text>
                    </View>
                    <Text style = {styles.heading2}>{order_date_str}</Text>    
                </View>
                <View style = {styles.information}>
                    <Text>
                        <Text style = {styles.faint}>{"Order No."}</Text>
                        <Text style = {styles.number}>{order_no}</Text>
                    </Text>
                    <Text style = {styles.dark}>{''.concat("Rs ", order_price)}</Text>
                </View>
            </View> 
            <TouchableOpacity onPress = {this.handleViewPress}>   
                <View style = {styles.view_order}>
                    <Text style = {styles.view_text}>{'View Order'}</Text>
                </View>
            </TouchableOpacity>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toper : {
        marginTop : 10,
        marginBottom : 15
    },
    container : {
        flexDirection  : 'column',
        justifyContent : 'flex-start',
        alignItems : 'stretch',
        height : 80,
        width : 355,
        borderWidth : 2,
        borderColor : 'lightgray',
        backgroundColor : 'white',
        borderRadius : 7,
      },
    heading : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    heading1Container : {
        height : 25,
        width : 150,
        backgroundColor : 'darkblue',
        paddingLeft : 5
    },
    heading1: {
        color : 'white',
        fontSize : 15
    },
    heading2 : {
        color : 'gray',
        fontSize : 14
    },
    information : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 13,
        marginLeft : 3,
        marginRight : 3
    },
    faint : {
        color : 'gray',
        fontSize : 16
    },
    number : {
        fontSize : 14
    },
    dark : {
        fontSize : 16,
        fontWeight : 'bold'
    },
    view_order : {
        height : 30,
        width : 355,
        borderWidth : 2,
        borderColor : 'lightgray'
    },
    view_text : {
        color : 'gray',
        fontSize : 16,
        textAlign : 'center'
    }
})