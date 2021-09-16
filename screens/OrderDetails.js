import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';

import OrderInfo2 from '../components/OrderInfo2';
import OrderProduct from '../components/OrderProduct';

import {getOrderProducts} from '../api/orderDetailsApi';

export default class OrderDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            ordered_products : [],
            loading : false,
        }
    }
    async componentDidMount(){
        this.setState({loading : true})
        const {navigation, route} = this.props;
        const {lines_url} = route.params;
        const order_products = await getOrderProducts(lines_url);
        this.setState({
            ordered_products : order_products,
            loading : false,
        })
    }
    render(){
        const {navigation, route} = this.props;
        const {ordered_products, loading} = this.state;
        const {order_no, order_date,order_price,order_url} = route.params;
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
                <OrderInfo2 order_no = {order_no}
                            order_date = {order_date}
                            sub_total = {order_price}
                            total = {order_price} />
                <View style = {styles.productheader}>
                    <Text style = {styles.title}>{'ORDER DETAILS'}</Text>
                </View>            
                <ScrollView style = {styles.productlst}>
                    {!!loading && <ActivityIndicator color = "green" size="large"/>}
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