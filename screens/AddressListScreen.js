import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Modal, TouchableOpacity, ActivityIndicator, RefreshControl ,BackHandler, Alert} from 'react-native';
import {BlurView} from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome';

import Address from '../components/Address';
import ConfirmMessage from '../components/ConfirmMessage';
import { getAddressList, deleteAddress } from '../api/addressApi';

import {connect} from 'react-redux';

class AddressListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
            loading: false,
            refreshing: false,
            is_delete_pressed : false,
            modal_visible : false,
            should_blur : false,
            show_arrow : false,
            flash_message : false
        }
    }
    handleBackPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Home");
        return true
    }
    componentDidMount() {
        const {navigation, route} = this.props;
        const {show_arrow} = route.params;
        if(show_arrow){
            this.setState({
                show_arrow : show_arrow
            })
        }    
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
        this._doApiCall();

    }
    async _doApiCall(){
        this.setState({
            loading : true
        })
        const addresses = await getAddressList();
        this.setState({
            addressList : addresses,
            loading : false
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
    }
    handleNewAddress = () => {
        const { navigation, route } = this.props;
        navigation.navigate('NewAddress')
    }
    handleTrashClick = async (id) => {
        this.setState({ loading: true })
        const status = await deleteAddress(id);
        if (status == '204') {
            this.setState({
                is_default_for_shipping : true,
                loading: false
            })
        } else {
            this.setState({ loading: false })
        }
        this._doApiCall();
    }
    _onRefresh = async () => {
        this.setState({ loading: true, refreshing: true })
        const addresses = await getAddressList();
        this.setState({
            loading: false,
            addressList: addresses,
            refreshing: false
        })

    }
    handlePressArrow = () => {
        const address_id = this.props.address_id;
        if(address_id){
            this.setState({
                modal_visible : true,
                should_blur : true
        })
        }else{
            this.setState({
                flash_message : true
            }, () => {setTimeout(() => this.closeFlashMessage(), 4000)})
        }
    }
    closeFlashMessage(){
        this.setState({
            flash_message : false
        })
    }
    handleCancelClick = () => {
        this.setState({
            modal_visible : false,
            should_blur : false
        })
    }
    handleConfirmClick = (checkout_details) => {
        this.setState({
            modal_visible : false,
            should_blur : false
        })
        const {navigation , route} = this.props;
        navigation.navigate("My Order", checkout_details);
    }
    render() {
        const { navigation, route, basket_price ,address_id} = this.props;
        const {refreshing, loading, addressList, modal_visible, should_blur, show_arrow,flash_message} = this.state;
        const compLst = addressList.map((address) => (
            <Address key={address.id}
                id={address.id}
                title={address.title}
                first_name={address.first_name}
                last_name={address.last_name}
                line1={address.line1}
                line2={address.line2}
                line3={address.line3}
                city={address.line4}
                state={address.state}
                postcode={address.postcode}
                phone_number={address.phone_number}
                nick_name={address.notes}
                is_default_for_shipping={address.is_default_for_shipping}
                is_default_for_billing={address.is_default_for_billing}
                country_url={address.country}
                address_url={address.url}
                navigation={navigation}
                onTrashClick={this.handleTrashClick} />))
        return (
            <View style={styles.container} >
                <View style={styles.topbarContainer}>
                    <TouchableOpacity style={styles.savedAddress}>
                        <Text style={styles.saved}>{'SAVED ADDRESSES'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newAddresses}
                        onPress={this.handleNewAddress}>
                        <Text style={styles.newaddText}>{'+ADD NEW ADDRESSES'}</Text>
                    </TouchableOpacity>
                </View>
                {!!flash_message && 
                    <View style = {styles.flash_message}>
                        <Text style = {styles.flashMessageText}>{'Please add and select atleast one user address , where the products would be dispatched'}</Text>
                    </View>}
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} />
                }>
                {!!loading && <ActivityIndicator color='blue' size='large' />}
                    {compLst}
                </ScrollView>
                {!!show_arrow && <TouchableOpacity style={styles.buttonArrow}
                    onPress={this.handlePressArrow}>
                    <Icon name="arrow-right"
                        size={50}
                        color='white'
                        style={styles.icon} />
                </TouchableOpacity>}
                {!!should_blur && <BlurView tint ="light" intensity = {100} 
                        style = {[StyleSheet.absoluteFill, styles.centeredView]}>
                    <Modal animationType = "slide"
                            transparent = {true}
                            visible = {modal_visible}
                            onRequestClose = {() => {this.setModalVisible(false)}}>
                            <ConfirmMessage order_value = {basket_price}
                                        delivery_charge = {'0'}
                                        total_value = {basket_price}
                                        onCancelClick = {this.handleCancelClick}
                                        onConfirmClick = {this.handleConfirmClick}    
                                        />
                        </Modal>
                    </BlurView> }
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    const {basket_id , basket_price} = state.basket;
    const addressId = state.addressId;
    return {
        basket_price : basket_price,
        address_id : addressId
    }
}

export default connect(mapStateToProps)(AddressListScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    centeredView : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    topbarContainer: {
        height: 32,
        width: 359,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    savedAddress: { marginLeft: 10, marginTop: 5 },
    saved: { color: 'gray', fontSize: 15 },
    newAddresses: { marginRight: 10, marginTop: 5 },
    newaddText: { color: 'blue', fontSize: 15 },
    buttonArrow : {
        alignSelf : 'center'
    },
    icon: {
        borderRadius: 40,
        backgroundColor: 'green',
        height: 55,
        width: 55,
        alignContent: 'center',
        alignContent: 'center'
    },
    flash_message : {
        position: 'absolute',
        backgroundColor: 'green',
        width: 290,
        justifyContent: 'center',
        alignItems: 'center',
        top: -33,
        left: 35,
        borderRadius: 7,
        marginTop: 10
    },
    flashMessageText : {
        color : 'white',
        fontSize: 15,
        textAlign: 'center'
    }
})