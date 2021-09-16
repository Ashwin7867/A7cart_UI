import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, ActivityIndicator,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {action_login} from '../redux/actions/loginActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            flashError: false,
            flashMessage: false
        }
    }
    handleUserChange = (text) => {
        this.setState({
            username: text
        })
    }
    handlePasswordChange = (text) => {
        this.setState({
            password: text
        })
    }
    handlePressLogin = async () => {
        const { username, password } = this.state;
        const { navigation, route } = this.props;
        const logindata = {
            username: username,
            password: password
        }
        await this.props.action_login(logindata);
        const {status_code, loading} = this.props;
        if (status_code === 200) {
            this.setState({
                flashMessage: true
            }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
            navigation.navigate('My Drawer')
        } else {
            this.setState({
                flashError: true
            }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
        }
        this.setState({
            username: '',
            password: '',
        })

    }
    closeFlashMessage() {
        this.setState({
            flashError: false,
            flashMessage: false
        })
    }
    render() {
        const { username, password, flashMessage, flashError } = this.state;
        const {loading} = this.props;
        return (
            <ScrollView>
            <View style={styles.container}>
                {!!loading && <ActivityIndicator size='large'
                    color='white'
                />
                }
                {flashMessage &&
                    <View style={styles.flashMessage}>
                        <Text style={styles.flashMessageText}>user successfully logged in</Text>
                    </View>}
                {flashError &&
                    <View style={styles.flashError}>
                        <Text style={styles.flashErrorText}>cannot log you in</Text>
                    </View>}

                <View style={styles.usernameContainer}>
                    <TextInput style={styles.username}
                        placeholder="Username"
                        onChangeText={this.handleUserChange}
                        value={username} />
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput style={styles.password}
                        placeholder="Password"
                        onChangeText={this.handlePasswordChange}
                        value={password} />
                </View>
                <Text style={styles.forgetPassword}>
                    Forget Password
                </Text>
                <TouchableOpacity style={styles.buttonSignin}
                    onPress={this.handlePressLogin}>
                    <Icon name="arrow-right"
                        size={50}
                        color='white'
                        style={styles.icon} />
                </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    const {status_code, session_id, loading} = state.loginReducer;
    return {
        status_code : status_code,
        loading : loading
    }
}

const mapDispatchToProps = {
    action_login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

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
        height: 250,
        width: 320,
        marginTop: 50,
    },
    flashMessage: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        top: -33,
        left: 65,
        borderRadius: 7
    },
    flashMessageText: {
        color: 'gray'
    },
    flashError: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        top: -33,
        left: 100,
        borderRadius: 7
    },
    flashErrorText: {
        color: 'gray'
    },
    usernameContainer: {
        marginTop: 20,
        marginLeft: 14,
        marginRight: 10,
    },
    username: {
        height: 30,
        width: 280,
        borderRadius: 30,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    passwordContainer: {
        marginTop: 25,
        marginLeft: 14,
        marginRight: 10,
    },
    password: {
        height: 30,
        width: 280,
        borderRadius: 30,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    forgetPassword: {
        fontSize: 12,
        color: 'lightgray',
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20
    },
    icon: {
        borderRadius: 40,
        backgroundColor: 'violet',
        height: 55,
        width: 55,
        alignContent: 'center',
        alignContent: 'center',

    },
    buttonSignin: {
        marginTop: 20,
        alignSelf: 'center'
    }
})