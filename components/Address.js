import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity ,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

import {updateAddress} from '../api/addressApi';

import {connect} from 'react-redux';
import {add_address_id} from '../redux/actions/addressActions';

class Address extends Component {
    constructor(props) {
        super(props);
    }
    handleToggle = (checked) => {
        const {id} = this.props;
        if(checked){
            this.props.add_address_id(id)
        }
        else{
            let temp = "";
            this.props.add_address_id("")
        }
    }
    handleEditAddress = () => {
        const { id, title, first_name, last_name, line1, line2, line3, city, state, postcode, phone_number, nick_name,  country_url, address_url, navigation,is_default_for_shipping } = this.props;
        const line1_ = line1.split(";");
        const plot_no = line1_[0];
        const apart_name = line1_[1];
        const line2_ = line2.split(";");
        const street_details = line2_[0];
        const landmark = line2_[1];
        const data = {
            id : id,
            title : title,
            first_name : first_name,
            last_name : last_name,
            house_no : plot_no,
            apartment_name : apart_name,
            street_details : street_details,
            landmark : landmark,
            area_details : line3,
            city : city,
            state : state,
            postcode : postcode,
            nick_name : nick_name,
            is_default_for_shipping : is_default_for_shipping
        }
        navigation.navigate('EditAddress', data);
    }
    onTrashClick = () => {
        const id = this.props.id;
        this.props.onTrashClick(id);
    }
    render() {
        const { id, title, first_name, last_name, line1, line2, line3, city, state, postcode, phone_number, nick_name,  country_url, address_url, navigation } = this.props;
        const add_details = line2.split(';');
        const street_details = add_details[0];
        const landmark = add_details[1];
        const {checked_address_id} = this.props;
        const is_checked = parseInt(id)===parseInt(checked_address_id)?true : false;
        const address_name = nick_name.split(" ")[0];
        return (
            <View style={styles.container}>
                <View style={styles.line1_container}>
                    <View style={styles.checkboxContainer}>
                        <CircleCheckBox checked={is_checked}
                            onToggle={this.handleToggle}
                            outerSize={16}
                            innerSize={12}
                            outerColor={'black'}
                            innerColor={'green'}
                            /></View>
                    <View style={styles.nickname_container}>
                        <Text style={styles.nick_name}>{address_name}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editContainer}
                            onPress={this.handleEditAddress}>
                            <Icon name='pencil' size={23} style={styles.trashIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteContainer}
                            onPress={this.onTrashClick}>
                            <Icon name='trash-o' size={23} style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line2_container}>
                    <Text style={styles.name}>{''.concat(title, " ", first_name, " ", last_name)}</Text>
                </View>
                <View style={styles.line3_container}>
                    <Text style={styles.line3}>{line1}</Text>
                </View>
                <Text style={styles.line4_container}>{street_details}</Text>
                <Text style={styles.line5_container}>{landmark}</Text>
                <View style={styles.line6_container}>
                    <Text style={styles.area}>{line3.concat(" ")}</Text>
                    <Text style={styles.city}>{city.concat(" ")}</Text>
                    <Text style={styles.pincode}>{postcode}</Text>
                </View>
                <View style={styles.line7_container}>
                    <Text style={styles.ph}>{'Ph: '}</Text>
                    <Text style={styles.phone_number}>{phone_number}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const addressId = state.addressId;
    return {
        checked_address_id : addressId
    }
}

export default connect(
    mapStateToProps,
    {add_address_id}
)(Address)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderWidth: 1.5,
        borderColor: 'lightgray',
        borderRadius: 4,
        height: 175,
        width: 360,
        marginTop: 10,
    },
    checkboxContainer: { color: 'green', marginTop: 5 },
    nickname_container: { marginLeft: 10 },
    line1_container: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 30
    },
    nick_name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 180
    },
    editContainer: { marginLeft: 10 },
    deleteContainer: { marginLeft: 30 },
    line2_container: {
        marginLeft: 30,
        marginTop: 5
    },
    name: {
        color: 'gray',
        fontSize: 14
    },
    line3_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginLeft: 30
    },
    line3: { color: 'gray' },
    line4_container: {
        color: 'gray',
        marginLeft: 30
    },
    line5_container: {
        color: 'gray', marginLeft: 30
    },
    line6_container: {
        flexDirection: 'row',
        marginLeft: 30
    },
    area: {
        color: 'gray'
    },
    city: { color: 'gray' },
    pincode: { color: 'gray' },
    line7_container: {
        flexDirection: 'row',
        marginLeft: 30
    },
    ph: { color: 'gray' },
    phone_number: { color: 'gray' }
})