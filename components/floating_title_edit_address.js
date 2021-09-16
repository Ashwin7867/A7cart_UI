import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';

export class FloatingTitleEditAddress extends Component {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputStyles: object,
        otherTextInputProps: object,
    }


    static defaultProps = {
        keyboardType: 'default',
        titleActiveSize: 11.5,
        titleInActiveSize: 15,
        titleActiveColor: 'gray',
        titleInactiveColor: 'dimgrey',
        textInputStyles: {},
        otherTextInputAttributes: {},
    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: true,
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 8],
                outputRange: [0, 8],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                <Animated.Text
                    style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                >
                    {this.props.title}
                </Animated.Text>
                <TextInput
                    value={this.props.value}
                    style={[Styles.textInput, this.props.textInputStyles]}
                    underlineColorAndroid='transparent'
                    onChangeText={this._onChangeText}
                    keyboardType={this.props.keyboardType}
                    {...this.props.otherTextInputProps}
                />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderStyle: 'solid',
        marginVertical: 4,
    },
    textInput: {
        fontSize: 15,
        marginTop: 15,
        color: 'gray',
    },
    titleStyles: {
        position: 'absolute',
        top: 3,
        fontSize: 13,
        color: 'gray'
    }
})