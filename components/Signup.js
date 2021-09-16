import React, { Component } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Text ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { signupApi } from '../api/signupApi';
import {make_sms_request} from '../api/fast2smsCall';

import {connect} from 'react-redux';
import {add_phone, add_first_name, add_last_name} from '../redux/actions/loginActions';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            phone_num : '',
            email: '',
            password: '',
            loading: false,
            flashError: false,
            flashMessage: false
        }
    }
    handleChangeFirstname = (text) => {
        this.setState({
            first_name: text
        })
    }
    handleChangeLastname = (text) => {
        this.setState({
            last_name: text
        })
    }
    handleChangeUsername = (text) => {
        this.setState({
            username: text
        })
    }
    handleChangePhone = (text) => {
        this.setState({
            phone_num : text
        })
    }
    handleChangeEmail = (text) => {
        this.setState({
            email: text
        })
    }
    handleChangePassword = (text) => {
        this.setState({
            password: text
        })
    }
    handleSignUp = async () => {
        const {first_name , last_name , username, email ,password, phone_num} = this.state;
        const signupData = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            phone : phone_num,
            password: password,
        }
        this.setState({
            loading: true
        })
        const sms_variables = "".concat(first_name,"|",username,"|",password);
        const {status , res_data} = await signupApi(signupData);
        if (status == '201') {
            const sms_res = await make_sms_request("31398","FSTSMS", phone_num, "{#BB#}|{#DD#}|{#EE#}", sms_variables );
            this.props.add_phone(res_data['phone']);
            this.props.add_first_name(res_data['first_name']);
            this.props.add_last_name(res_data['last_name']);
            console.log(sms_res);
            this.setState({
                flashMessage: true
            }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
           
        } else {
            this.setState({
                flashError: true
            }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
        }
        this.setState({
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            phone_num : '',
            email: '',
            loading: false,
        })
    }
    closeFlashMessage() {
        this.setState({
            flashMessage: false,
            flashError: false
        })
    }
    render() {
        const { first_name, last_name, username, email,phone_num,  password, loading, flashMessage, flashError } = this.state;
        return (
            <ScrollView>
            <KeyboardAvoidingView style={styles.container}>
                {!!loading && <ActivityIndicator size='large'
                    color='white'
                />
                }
                {flashMessage == true ? <View style={styles.flashMessage}>
                    <Text style={styles.flashMessageText}>User created</Text>
                </View> : null
                }
                {flashError == true ? <View style={styles.flashError}>
                    <Text style={styles.flashErrorText}>Sorry,user has not been created</Text>
                </View> : null}
                <View style={styles.nameContainer}>
                    <TextInput placeholder="first_name"
                        onChangeText={this.handleChangeFirstname}
                        value={first_name}
                        style={styles.first_name} />
                    <TextInput placeholder='last name'
                        onChangeText={this.handleChangeLastname}
                        value={last_name}
                        style={styles.last_name} />
                </View>
                <TextInput placeholder="Username"
                    onChangeText={this.handleChangeUsername}
                    value={username}
                    style={styles.username} />
                <TextInput placeholder = "Phone Number"
                        onChangeText = {this.handleChangePhone}
                        value = {phone_num} 
                        style = {styles.phone_num} />    
                <TextInput placeholder="Email Address"
                    onChangeText={this.handleChangeEmail}
                    value={email}
                    style={styles.email} />
                <TextInput placeholder="Password"
                    onChangeText={this.handleChangePassword}
                    value={password}
                    style={styles.password} />
                <TouchableOpacity onPress={this.handleSignUp}
                    style={styles.buttonContainer}>
                    <Icon name="arrow-right" size={33} color="white"
                        style={styles.icon} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        temp_login : state.loginReducer
    }
}

const mapDispatchToProps = {
    add_phone,
    add_first_name,
    add_last_name
}

export default connect(mapStateToProps , mapDispatchToProps)(Signup);


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'purple',
        borderWidth: 2,
        borderColor: 'lightgray',
        height: 420,
        width: 325,
        marginTop: 35
    },
    flashMessage: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        top: -33,
        left: 100,
        borderRadius: 7
    },
    flashError: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        top: -33,
        left: 70,
        borderRadius: 7
    },
    flashMessageText: {
        color: 'gray'
    },
    flashErrorText: {
        color: 'gray'
    },
    nameContainer: {
        flexDirection: 'row'
    },
    first_name: {
        height: 30,
        width: 130,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 14,
        marginRight: 10,
        paddingLeft: 12
    },
    last_name: {
        height: 30,
        width: 130,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 14,
        paddingLeft: 12
    },
    username: {
        height: 30,
        width: 289,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 14,
        marginRight: 10,
        paddingLeft: 12
    },
    phone_num : {
        height: 30,
        width: 289,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 14,
        marginRight: 10,
        paddingLeft: 12
    },
    email: {
        height: 30,
        width: 289,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 14,
        marginRight: 10,
        paddingLeft: 12
    },

    password: {
        height: 30,
        width: 289,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 14,
        marginRight: 10,
        paddingLeft: 12
    },
    buttonContainer: {
        marginTop: 48,
        alignSelf: 'center'
    },
    icon: {
        borderRadius: 40,
        backgroundColor: 'violet',
        height: 55,
        width: 55,
        alignContent: 'center',
        paddingTop: 12,
        paddingLeft: 13
    }
})
