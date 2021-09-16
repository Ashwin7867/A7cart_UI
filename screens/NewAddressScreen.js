import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Icon from 'react-native-vector-icons/EvilIcons';

import { FloatingTitleTextInputField } from '../components/floating_title_text_input_field';
import AddressMap from '../components/AddressMap';

import { addAddress } from '../api/addressApi';

import { connect } from 'react-redux';

class NewAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Mr',
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
            nick_name: 'temp',
            is_default_for_shipping: false,
            is_default_for_billing: false,
            country: 'https://a7cart.herokuapp.com/api/countries/IN/',
            loading: false,
            error: false,
            show_map: false,
            latitude: null,
            longitude: null
        }
    }
    componentDidMount() {
        const { first_name, last_name, phone } = this.props;
        this.setState({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone
        })
    }
    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    handleNickNamePress = (text) => {
        this.setState({
            nick_name: text
        })
    }
    handleAddClick = async () => {
        this.setState({
            loading: true
        })
        const { title, first_name, last_name, phone_number, house_no, apartment_name, street_details, landmark, area_details, city, state, postcode, nick_name, is_default_for_shipping, is_default_for_billing, country, latitude, longitude } = this.state;
        const line1 = ''.concat(house_no, ";", apartment_name);
        const line2 = ''.concat(street_details, ";", landmark);
        let new_number = '';
        if (phone_number.length === 10) {
            new_number = "".concat("+91", phone_number)
        }
        else if (phone_number.length === 12) {
            new_number = "".concat("+", phone_number)
        } else {
            new_number = phone_number
        }
        const temp_name = nick_name.concat(" ", latitude, " ", longitude);
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
            phone_number: new_number,
            notes: temp_name,
            is_default_for_shipping: is_default_for_shipping,
            is_default_for_billing: is_default_for_billing,
            country: country
        }
        const res_data = await addAddress(data);
        if (res_data['status'] == '201') {
            this.setState({ loading: false })
            const { navigation, route } = this.props;
            console.log(res_data['jsondata']);
            navigation.navigate('AddressList')
        } else {
            this.setState({ loading: false, error: true });
            console.log('The new address cannot be added')
        }
    }
    handleCitySelect = (value) => {
        this.setState({
            city: value
        })
    }
    handleShowMap = () => {
        this.setState({
            show_map: true
        })
    }
    handleCloseMap = () => {
        this.setState({
            show_map: false
        })
    }
    handleLatLong = (lat, long) => {
        this.setState({
            latitude: lat,
            longitude: long
        })
    }
    render() {
        const { first_name, last_name, phone_number, house_no, apartment_name, street_details, landmark, area_details, city, state, postcode, nick_name, is_default_for_shipping, is_default_for_billing, country, loading, show_map, latitude, longitude, error } = this.state;
        let city_data = [{ value: 'Nagpur' },
        { value: 'Pune' },
        { value: 'Mumbai' },
        { value: 'Aurangabad' },
        { value: 'Nashik' }]
        let button_options = ['Home', 'Shop', 'Others'];
        const button_lst = button_options.map((button_name) => {
            if (button_name === nick_name) {
                return (
                    <TouchableOpacity style={[styles.shop_button, { backgroundColor: 'green' }]}
                        onPress={() => this.handleNickNamePress(button_name)}>
                        <Text style={[styles.buttonText, { color: 'white', fontWeight: 'bold' }]}>{button_name}</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity style={styles.shop_button}
                        onPress={() => this.handleNickNamePress(button_name)}>
                        <Text style={styles.buttonText}>{button_name}</Text>
                    </TouchableOpacity>
                )
            }
        })
        return (
            <View style={styles.topContainer}>
                <ScrollView style={styles.container}>
                    {!!loading && <ActivityIndicator size="large" color="green" />}
                    {!!error && <TouchableOpacity style={styles.error}><Text style={styles.errorText}>{'There has been an error adding the address, Sorry'}</Text></TouchableOpacity>}
                    <View style={styles.per_details}>
                        <Text style={styles.heading1}>
                            {'Personal Details'}
                        </Text>
                        <View style={styles.nameContainer}>
                            <View style={styles.fn_container}>
                                <Text style={styles.first_name_heading}>{'Enter First Name'}</Text>
                                <TextInput style={styles.first_name}
                                    value={first_name}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.ln_container}>
                                <Text style={styles.last_name_heading}>{'Enter Last Name'}</Text>
                                <TextInput style={styles.last_name}
                                    value={last_name}
                                    editable={false} />
                            </View>
                        </View>
                        <View style={styles.phone_no_container}>
                            <Text style={styles.phone_no_heading}>{'Contact number to say hello'}</Text>
                            <TextInput style={styles.phone_number}
                                value={phone_number}
                                editable={false} />
                        </View>
                    </View>
                    <View style={styles.address_details_container}>
                        <Text style={styles.ad_heading}>{'Address Details'}</Text>
                        <View style={styles.line1_container}>
                            <View style={styles.house_no}>
                                <FloatingTitleTextInputField attrName='house_no'
                                    title='House No.'
                                    value={house_no}
                                    updateMasterState={this._updateMasterState}
                                    textInputStyles={{
                                        color: 'black',
                                        fontSize: 15,
                                        width: 150
                                    }} />
                            </View>
                            <View style={styles.apt_name}>
                                <FloatingTitleTextInputField attrName='apartment_name'
                                    title='Apartment Name'
                                    value={apartment_name}
                                    updateMasterState={this._updateMasterState}
                                    textInputStyles={{
                                        color: 'black',
                                        fontSize: 15,
                                        width: 150
                                    }} />
                            </View>
                        </View>
                        <View style={styles.line2_container}>
                            <FloatingTitleTextInputField attrName='street_details'
                                title='Street details to locate you'
                                value={street_details}
                                updateMasterState={this._updateMasterState}
                                textInputStyles={{
                                    color: 'black',
                                    fontSize: 15
                                }} />
                        </View>
                        <View style={styles.line3_container}>
                            <FloatingTitleTextInputField attrName='landmark'
                                title='Land mark for easy reach out'
                                value={landmark}
                                updateMasterState={this._updateMasterState}
                                textInputStyles={{
                                    color: 'black',
                                    fontSize: 15
                                }} />
                        </View>
                        <View style={styles.line4_container}>
                            <FloatingTitleTextInputField attrName='area_details'
                                title='Area details'
                                value={this.state.area_details}
                                updateMasterState={this._updateMasterState}
                                textInputStyles={{
                                    color: 'black',
                                    fontSize: 15
                                }} />
                        </View>
                        <View style={styles.line5_container}>
                            <View style={styles.city_container}>
                                {/* <Dropdown label="City" data={city_data}
                                    onChangeText={this.handleCitySelect} /> */}
                            </View>
                            <View style={styles.pincode_container}>
                                <FloatingTitleTextInputField attrName='postcode'
                                    title='Pincode'
                                    value={postcode}
                                    updateMasterState={this._updateMasterState}
                                    textInputStyles={{
                                        color: 'black',
                                        fontSize: 15,
                                        width: 150
                                    }} />
                            </View>
                        </View>
                        {show_map && <AddressMap closeMap={this.handleCloseMap}
                            getLatLong={this.handleLatLong} />
                        }
                        {!show_map && !latitude && !longitude && (<TouchableOpacity style={styles.useMapButton}
                            onPress={this.handleShowMap}>
                            <Icon name="location" size={25} color="blue" />
                            <Text style={styles.useMapButtonText}>{'Choose your location from the map'}</Text>
                        </TouchableOpacity>)
                        }
                        {!show_map && !!latitude && !!longitude && (<TouchableOpacity style={styles.locationSelected}>
                            <View style={styles.line1}>
                                <Icon name="location" size={35} color="green" style={styles.locationIconStyle} />
                                <Text style={styles.locationSelText}>{'Location has been Selected'}</Text>
                            </View>
                            <Text style={styles.latlongText}>{"Latitude : ".concat(latitude)}</Text>
                            <Text style={styles.latlongText}>{"Longitude : ".concat(longitude)}</Text>
                        </TouchableOpacity>)
                        }
                        <View style={styles.line6_container}>
                            <Text style={styles.line6_heading}>{'Choose nick name for this address'}</Text>
                            <View style={styles.button_container}>
                                {button_lst}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.addButtonContainer}
                    onPress={this.handleAddClick}>
                    <Text style={styles.addButton}>{'ADD ADDRESS'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { first_name, last_name, phone } = state.loginReducer;
    return {
        first_name, last_name, phone
    }
}

export default connect(mapStateToProps)(NewAddressScreen)

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
        marginTop: 15,
        marginLeft: 35
    },
    house_no: {},
    apt_name: { marginLeft: -20 },
    line2_container: {
        marginTop: 10,
        marginLeft: 35
    },
    line3_container: {
        marginTop: 10,
        marginLeft: 35
    },
    landmark: {},
    line4_container: { marginTop: 15, marginLeft: 35 },
    line5_container: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    city_container: { marginLeft: 35, width: 120, marginTop: 1 },
    pincode_container: { marginLeft: 35 },
    line6_container: {
        marginTop: 35
    },
    line6_heading: { color: 'gray', fontSize: 13, marginLeft: 34 },
    button_container: {
        flexDirection: 'row',
    },
    shop_button: {
        height: 30,
        width: 67,
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 30
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
    },
    error: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'green',
        height: 35,
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 10
    },
    errorText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    useMapButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        width: 300,
        height: 35,
        marginTop: 35,
        marginLeft: 25,
        marginBottom: 20
    },
    useMapButtonText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'red'
    },
    locationSelected: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        width: 320,
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 20
    },
    line1: {
        flexDirection: 'row'
    },
    locationSelText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'green',
        paddingLeft: 5
    },
    latlongText: {
        marginLeft: 40,
        fontSize: 15
    }
})
