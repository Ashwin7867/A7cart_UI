import React , {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet,AsyncStorage, ActivityIndicator} from 'react-native';

import {getShippingMethod, getAddressInfo, getBasketInfo,confirmCheckout} from '../api/checkoutApi';
import {make_sms_request} from '../api/fast2smsCall';

import {connect} from 'react-redux';
import {clear_basket, load_basket_info} from '../redux/actions/basketActions';

class ConfirmMessage extends Component{
    constructor(props){
        super(props);
        this.state = {loading : false,
                    del_date : '',
                    del_month: '',
                    del_year : ''}
    }
    componentDidMount(){
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const today = new Date();
        const date = today.getDate();
        const mon_ = today.getMonth();
        const year = today.getFullYear();
        this.setState({
            del_date : parseInt(date)+1,
            del_month : months[mon_],
            del_year : year
        })

    }
    
    handleConfirmClick  = async () => {
        this.setState({loading : true})
        const {checked_address_id , session_id} = this.props;
        console.log('This addressid have been retrieved from confirm message handle confirmclick', checked_address_id)
        const shipping_method_code = await getShippingMethod();
        const basket_data = await getBasketInfo();
        const basket_url = basket_data['url'];
        const basket_total = basket_data['total_incl_tax'];
        const shipping_address = await getAddressInfo(checked_address_id);
        const data = {
            basket : basket_url,
            total : basket_total,
            shipping_method_code : shipping_method_code,
            shipping_address : shipping_address
        }
        console.log(data);
        const {status , json_data} = await confirmCheckout(data);
        console.log(json_data);
        const { phone} = this.props;
        if(status >= "200" && status <"300" ){
            const {del_date,del_month,del_year} = this.state;
            const order_del_date = "".concat(del_date , "/", del_month,"/",del_year );
            const {number , total_incl_tax ,shipping_address } = json_data;
            const {first_name , phone_number, line3} = shipping_address ;
            const var_values = "".concat(first_name,"|",number,"|",order_del_date,"|",line3,"|",total_incl_tax);
            const message_res = await make_sms_request("31405","FSTSMS", phone, "{#BB#}|{#AA#}|{#CC#}|{#DD#}|{#EE#}", var_values);
            console.log("The order confirmation message is sent to user", message_res)
            this.props.clear_basket();
            this.props.load_basket_info(session_id);
            this.setState({loading : false})
            this.props.onConfirmClick(json_data);
        }
        else{
            console.log("There was an error in confirming the order");
            this.setState({
                loading : false
            })
        }
    }
    render(){
        const {order_value, delivery_charge, total_value} = this.props;
        const {loading,del_date,del_month,del_year} = this.state;
        return (
            <View style = {styles.container}>
                {!!loading && <ActivityIndicator color = "blue"
                                    size = "large" />}
                <View style = {styles.headerContainer}>
                    <Text style = {styles.headText}>{'Kindly confirm your order details'}</Text>
                </View>
                <View style = {styles.info}>
                    <Text style = {styles.line1}>{''.concat("Order Value     : Rs. ",order_value)}</Text>
                    <Text style = {styles.line2}>{''.concat("Delivery Charges    : Rs. ", delivery_charge)}</Text>
                    <Text style = {styles.line3}>{''.concat("Total Value    :Rs. ",total_value)}</Text>
                    <Text style = {styles.line4}>{''.concat("Delivery Date    :".concat(del_date," ",del_month," ",del_year))}</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style = {styles.cancelButton}
                        onPress = {this.props.onCancelClick}>
                        <Text style = {styles.cancelText}>{'Cancel'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.confirmButton}
                    onPress = {this.handleConfirmClick}>
                        <Text style = {styles.confirmText}>{'Confirm'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const checked_address_id = state.addressId;
    const {session_id , phone, first_name, last_name} = state.loginReducer;
    return {
        checked_address_id : checked_address_id,
        session_id :session_id,
        phone : phone,
        first_name : first_name,
        last_name : last_name
    }
}

const mapDispatchToProps = {
    clear_basket,
    load_basket_info
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage)

const styles = StyleSheet.create({
    container : {
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'stretch',
        height : 260,
        width : 300,
        borderRadius : 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 4,
	        height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 4,
        elevation: 3.3,
        marginTop : 150,
        marginLeft : 27,
        backgroundColor: 'white'
    },
    headerContainer : {
        height : 40,
        width : 293,
        backgroundColor : 'green',
        marginLeft : 3
    },
    headText : {
        color : 'white',
        fontSize : 20,
        textAlign : 'center'
    },
    info : {
        flexDirection : 'column',
        justifyContent : 'flex-start',
        alignItems : 'stretch',
        height : 180,
        width : 300 
    },
    line1: {
        fontSize : 18,
        marginTop : 15,
        marginLeft : 60 
        },
    line2: {
        fontSize : 18,
        marginTop : 4,
        marginLeft : 25
        },
    line3: {
        fontSize : 18,
        marginTop : 5,
        marginLeft : 70
    },
    line4:{
        fontSize : 18,
        marginTop : 4,
        marginLeft : 54
    },
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'stretch',
        height : 40,
        width : 290,
        marginLeft : 3
    },
    cancelButton : {
        height : 40,
        width : 147,
        borderWidth : 2,
        borderColor : 'gray',
        borderRadius : 10
    },
    cancelText : {
        fontSize : 24,
        textAlign : 'center'
    },
    confirmButton : {
        height : 40,
        width : 147,
        borderWidth : 2,
        borderColor : 'gray',
        borderRadius : 10
    },
    confirmText : {
        textAlign : 'center',
        fontSize : 24
    }
})