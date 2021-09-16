import React , {Component} from 'react';
import {View , StyleSheet , Text} from 'react-native';

export default class AboutUs extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.text}>
                    AboutUS screen
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1 , 
        flexDirection : 'column',
        justifyContent : 'center',
        'alignItems' : 'center'
    },
    text : {color: 'blue'}
})