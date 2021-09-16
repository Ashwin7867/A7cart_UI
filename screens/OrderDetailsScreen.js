import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator ,BackHandler} from 'react-native';

import OrderInfo from '../components/OrderInfo';
import OrderProduct from '../components/OrderProduct';

import {getOrderProducts} from '../api/orderDetailsApi';

export default class OrderDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            ordered_products : [],
            order_total : '',
            del_date : '',
            del_month: '',
            del_year : '',
            loading : false,
            currency : ''
        }
    }
    handleBackPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Home",{
            should_reload : true
        });
        return true
    }
    async componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
        this.setState({loading : true})
        const {navigation, route} = this.props;
        console.log(route.params);
        const { currency ,date_placed, lines,number,total_incl_tax, url} = route.params;
        const order_products = await getOrderProducts(lines);
        const temp_arr = date_placed.split("-");
        const year = temp_arr[0];
        const month = temp_arr[1];
        const day = temp_arr[2].slice(0,2);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        this.setState({
            ordered_products : order_products,
            order_total : total_incl_tax,
            del_date : parseInt(day)+1,
            del_month : months[parseInt(month)],
            del_year : year,
            loading : false,
            currency : currency
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress",this.handleBackPress)
    }
    render(){
        const {ordered_products, order_total,del_date,del_month,del_year, loading, currency} = this.state;
        const orderedProLst = ordered_products.map((line_info) => (
                <OrderProduct   key = {line_info.url}
                                url = {line_info.url}
                                product_url = {line_info.product}
                                stock_record = {line_info.stockrecord}
                                quantity = {line_info.quantity}
                                price_incl_tax = {line_info.price_incl_tax}/>
            )
        )
        return (
            <View style = {styles.container}>
                <OrderInfo del_date = {" ".concat(del_date,"-",del_month,"-",del_year)}
                            sub_total = {order_total}
                            total = {order_total} />
                <View style = {styles.productheader}>
                    <Text style = {styles.title}>{'ORDER DETAILS'}</Text>
                </View>            
                <ScrollView style = {styles.productlst}>
                    {orderedProLst}
                </ScrollView>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'stretch',
    },
    productlst : {
    },
    productheader : {
        height : 30,
        width : 355,
        backgroundColor : 'green',
        marginTop :10
    },
    title : {
        fontSize : 16,
        color : 'white',
        paddingTop : 3,
        paddingLeft : 7
    }
})