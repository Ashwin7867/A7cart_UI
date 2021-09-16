import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Profile extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Profile Screen
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: { color: 'blue' }
})