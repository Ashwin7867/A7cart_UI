import React , {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';

import Order from '../components/Order';

import {getOrderList} from '../api/orderDetailsApi';

export default class OrderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders : [],
            loading : false
        }
    }
    async componentDidMount(){
        this.setState({loading : true})
        const order_list = await getOrderList();
        this.setState({
            orders : order_list,
            loading : false
        })
    }
    render(){
        const {orders, loading} = this.state;
        const {navigation} = this.props;
        const renderItems = orders.map((order) => {
            return (
                <Order key = {order.number}
                        order_no = {order.number}
                        order_date = {order.date_placed}
                        order_price = {order.total_incl_tax}
                        order_url = {order.url}
                        lines_url = {order.lines}
                        navigation = {navigation} />
            )
        })
        return (
            <ScrollView>
                {!!loading && <ActivityIndicator size = "large" color = "green" />}
                {renderItems}
            </ScrollView>
        )
 
    }
}