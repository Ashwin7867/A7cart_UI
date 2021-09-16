import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown-v2-fixed';

import { updateAddress } from '../api/addressApi';

export default class EditAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            house_no: '',
            apartment_name: '',
            street_details: '',
            landmark: '',
            area_details: '',
            city: '',
            state: '',
            postcode: '',
            nick_name: '',
            is_default_for_shipping: '',
            is_default_for_billing: '',
            country: 'https://a7cart.herokuapp.com/api/countries/IN/',
            loading: false
        }
    }
    componentDidMount() {
        this._doApiCall();
    }
    _doApiCall() {
        const { navigation, route } = this.props;
        const { id, title, first_name, last_name, phone_number, house_no, apartment_name, street_details, landmark, area_details, city, state, postcode, nick_name, is_default_for_shipping } = route.params;
        this.setState({
            id: id,
            title: title,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            house_no: house_no,
            apartment_name: apartment_name,
            street_details: street_details,
            landmark: landmark,
            area_details: area_details,
            city: city,
            state: state,
            postcode: postcode,
            nick_name: nick_name,
            is_default_for_shipping: is_default_for_shipping,
            is_default_for_billing: is_default_for_shipping
        })
    }
    handleHomePress = () => {
        this.setState({
            nick_name: 'Home'
        })
    }
    handleShopPress = () => {
        this.setState({
            nick_name: 'Shop'
        })
    }
    handleOtherPress = () => {
        this.setState({
            nick_name: 'Other'
        })
    }
    handleEditClick = async () => {
        const { navigation, route } = this.props;
        this.setState({
            loading: true
        })
        const { id, title, first_name, last_name, phone_number, house_no, apartment_name, street_details, landmark, area_details, city, state, postcode, nick_name, is_default_for_shipping, is_default_for_billing, country } = this.state;
        const line1 = ''.concat(house_no, ";", apartment_name);
        const line2 = ''.concat(street_details, ";", landmark);
        const data = {
            title: title,
            first_name: first_name,
            last_name: last_name,
            line1: line1,
            line2: line2,
            line3: area_details,
            line4: city,
            state: state,
            postcode: postcode,
            phone_number: phone_number,
            notes: nick_name,
            is_default_for_shipping: is_default_for_shipping,
            is_default_for_billing: is_default_for_billing,
            country: country
        }
        const res_data = await updateAddress(data, id);
        if (parseInt(res_data['status']) < 400) {
            this.setState({ loading: false })
            navigation.navigate('AddressList')
        } else {
            this.setState({ loading: false });
            console.log('The new address cannot be added')
        }
    }
    handleCitySelect = (value) => {
        this.setState({
            city: value
        })
    }
    updateState_ = (attrName, value) => {
        this.setState({ [attrName]: value })
    }
    render() {
        const { title, first_name, last_name, phone_number, house_no, apartment_name, street_details, landmark, area_details, city, state, postcode, nick_name, is_default_for_shipping, is_default_for_billing, country, loading } = this.state;
        let city_data = [{ value: 'Nagpur' },
        { value: 'Pune' },
        { value: 'Mumbai' },
        { value: 'Aurangabad' },
        { value: 'Nashik' }]
        return (
            <View style={styles.topContainer}>
                <ScrollView style={styles.container}>
                    <View style={styles.per_details}>
                        <Text style={styles.heading1}>
                            {'Personal Details'}
                        </Text>
                        <View style={styles.nameContainer}>
                            <View style={styles.fn_container}>
                                <Text style={styles.first_name_heading}>{'Enter First Name'}</Text>
                                <TextInput style={styles.first_name}
                                    value={first_name}
                                    onChangeText={(val) => this.updateState_('first_name', val)}
                                />
                            </View>
                            <View style={styles.ln_container}>
                                <Text style={styles.last_name_heading}>{'Enter Last Name'}</Text>
                                <TextInput style={styles.last_name}
                                    value={last_name}
                                    onChangeText={(val) => this.updateState_('last_name', val)} />
                            </View>
                        </View>
                        <View style={styles.phone_no_container}>
                            <Text style={styles.phone_no_heading}>{'Contact number to say hello'}</Text>
                            <TextInput style={styles.phone_number}
                                value={phone_number}
                                onChangeText={(val) => this.updateState_('phone_number', val)} />
                        </View>
                    </View>
                    <View style={styles.address_details_container}>
                        <Text style={styles.ad_heading}>{'Address Details'}</Text>
                        <View style={styles.line1_container}>
                            <View style={styles.house_no_container}>
                                <Text style={styles.house_no_heading}>{'House no.'}</Text>
                                <TextInput style={styles.house_no}
                                    value={house_no}
                                    onChangeText={(val) => this.updateState_('house_no', val)} />
                            </View>
                            <View style={styles.apt_name_container}>
                                <Text style={styles.apt_name_heading}>{'Apartment name'}</Text>
                                <TextInput style={styles.apt_name}
                                    value={apartment_name}
                                    onChangeText={(val) => this.updateState_('apartment_name', val)} />
                            </View>
                        </View>
                        <View style={styles.line2_container}>
                            <Text style={styles.street_details_heading}>{'Street details to locate you'}</Text>
                            <TextInput style={styles.street_details}
                                value={street_details}
                                onChangeText={(val) => this.updateState_('street_details', val)} />
                        </View>
                        <View style={styles.line3_container}>
                            <Text style={styles.landmark_heading}>{'Landmark for easy reach out'}</Text>
                            <TextInput style={styles.landmark}
                                value={landmark}
                                onChangeText={(val) => this.updateState_('landmark', val)} />
                        </View>
                        <View style={styles.line4_container}>
                            <Text style={styles.area_details_heading}>{'Area details'}</Text>
                            <TextInput style={styles.area_details}
                                value={area_details}
                                onChangeText={(val) => this.updateState_('area_details', val)} />
                        </View>
                        <View style={styles.line5_container}>
                            <View style={styles.city_container}>
                                {/* <Dropdown label="City" data={city_data}
                                    onChangeText={this.handleCitySelect} /> */}
                            </View>
                            <View style={styles.pincode_container}>
                                <Text style={styles.pincode_heading}>{'Pincode'}</Text>
                                <TextInput style={styles.pincode}
                                    value={postcode}
                                    onChangeText={(val) => this.updateState_('postcode', val)} />
                            </View>
                        </View>
                        <View style={styles.line6_container}>
                            <Text style={styles.line6_heading}>{'Choose nick name for this address'}</Text>
                            <View style={styles.button_container}>
                                <TouchableOpacity style={styles.home_button}
                                    onPress={this.handleHomePress}>
                                    <Text style={styles.buttonText}>{'Home'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shop_button}
                                    onPress={this.handleShopPress}>
                                    <Text style={styles.buttonText}>{'Shop'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.other_button}
                                    onPress={this.handleOtherPress}>
                                    <Text style={styles.buttonText}>{'Other'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {!!loading && <ActivityIndicator size="large" color="green" />}
                <TouchableOpacity style={styles.addButtonContainer}
                    onPress={this.handleEditClick}>
                    <Text style={styles.addButton}>{'UPDATE ADDRESS'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: { flex: 1 },
    container: {
        flexDirection: 'column',
    },
    per_details: {
        flexDirection: 'column',
        marginTop: 30
    },
    heading1: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 15,
    },
    nameContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginTop: 15
    },
    first_name_heading: {
        color: 'gray',
        fontSize: 12
    },
    fn_container: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 35,
    },
    first_name: { fontSize: 15 },
    ln_container: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 20
    },
    last_name_heading: {
        color: 'gray',
        fontSize: 12
    },
    last_name: { fontSize: 15 },
    phone_no_container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginLeft: 35,
        marginTop: 14
    },
    phone_no_heading: {
        color: 'gray',
        fontSize: 12
    },
    phone_number: { fontSize: 15 },
    address_details_container: {
        flexDirection: 'column',
        marginTop: 10
    },
    ad_heading: {
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
        fontSize: 16
    },
    line1_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginLeft: 35
    },
    house_no_heading: {
        color: 'gray',
        fontSize: 12
    },
    house_no: { fontSize: 15 },
    apt_name_container: { marginLeft: 50 },
    apt_name_heading: {
        color: 'gray',
        fontSize: 12
    },
    apt_name: { fontSize: 15 },
    line2_container: {
        marginTop: 15,
        marginLeft: 35
    },
    street_details_heading: { color: 'gray', fontSize: 12 },
    street_details: { fontSize: 15 },
    line3_container: {
        marginTop: 10,
        marginLeft: 35
    },
    landmark_heading: { color: 'gray', fontSize: 12 },
    landmark: { fontSize: 15 },
    line4_container: { marginTop: 15, marginLeft: 35 },
    area_details_heading: { color: 'gray', fontSize: 12 },
    area_details: { fontSize: 15 },
    line5_container: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    city_container: { marginLeft: 35, width: 120 },
    pincode_container: { marginLeft: 40, marginTop: 10 },
    pincode_heading: { color: 'gray', fontSize: 12 },
    pincode: { fontSize: 15 },
    line6_container: {
        marginTop: 20
    },
    line6_heading: { color: 'gray', fontSize: 13, marginLeft: 34 },
    button_container: {
        flexDirection: 'row',
    },
    home_button: {
        height: 30,
        width: 67,
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 35
    },
    shop_button: {
        height: 30,
        width: 67,
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15
    },
    other_button: {
        height: 30,
        width: 67,
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15
    },
    buttonText: { fontSize: 15, textAlign: 'center' },
    addButtonContainer: {
        height: 35,
        width: 356,
        backgroundColor: 'green',
    },
    addButton: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 5
    }
})