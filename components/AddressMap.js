import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity , ActivityIndicator} from 'react-native';

import MapView from 'react-native-maps';

export default class AddressMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading : false,
            error : null,
            region : {
                latitude : null,
                longitude : null,
                latitudeDelta : 0.01,
                longitudeDelta : 0.01
            },
            marker_coordinate : {
                latitude : null,
                longitude : null 
            }
        }
    }
    componentDidMount(){
        let geoOptions = {
            enableHighAccuracy : true,
            timeout : 20000,
            maximumAge : 60*60*24
        }
        this.setState({
            loading : true , error : null
        })
        navigator.geolocation.getCurrentPosition(this.geoSuccess , this.geoFailure , geoOptions);
    }
    geoSuccess = (position) => {
        console.log(position);
        const {region} = this.state;
        const new_region = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
            latitudeDelta : region.latitudeDelta,
            longitudeDelta : region.longitudeDelta
        }
        const new_marker = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }
        this.setState({
            loading : false,
            error : null,
            region : new_region,
            marker_coordinate : new_marker
        })
    }
    geoFailure = (err) => {
        this.setState({
            error : err.message,
            loading : false
        })
    }
    handleRegionChange = (info) => {
        this.setState({
            region : info
        })
    }
    handleDragEnd = (e) => {
        const info = e.nativeEvent;
        const new_marker = info.coordinate;
        this.setState({
            marker_coordinate : new_marker
        })
    } 
    handleSavePress = () => {
        const {latitude , longitude} = this.state.marker_coordinate;
        this.props.getLatLong(latitude , longitude);
        this.props.closeMap();
    }
    getMap = () => {
        const {region, marker_coordinate} = this.state;
        return (
            <MapView style = {styles.map}
                        initialRegion = {region}
                        showsUserLocation = {true}
                        onRegionChangeComplete={this.handleRegionChange}
                        mapType = "hybrid"
                        userLocationPriority = {'high'}
                        >
                <MapView.Marker coordinate = {{"latitude": marker_coordinate.latitude,"longitude":marker_coordinate.longitude}}
                                title = {'Your Location'}
                                onDragEnd = {this.handleDragEnd}
                                draggable/>
            </MapView>
        )
    }
    render(){
        const {loading , error } = this.state;
        const {latitude , longitude} = this.state.marker_coordinate;
        return (
            <View style = {styles.container}>
                {
                    !!loading && <ActivityIndicator size= "large" color = "green" />
                }
                {!!error && (
                    <Text>{error}</Text>
                )}
                {!loading && this.getMap()}
                <Text>Latitude : {latitude}</Text>
                <Text>Longitude : {longitude}</Text>
                <TouchableOpacity style = {styles.mapConfirmButton}
                    onPress = {this.handleSavePress}>
                    <Text style = {styles.mapButtonStyle}>Save My Location from Map</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        marginTop : 50,
        marginLeft :5,
        marginRight : 5
    },
    map : {
        height : 450,
    },
    mapConfirmButton : {
        borderWidth : 1,
        borderColor : 'gray',
        backgroundColor : 'green',
        height : 35,
        width : 230,
        borderRadius : 6,
        alignSelf : 'center',
        marginTop : 10
    },
    mapButtonStyle : {
        color: 'white',
        fontWeight : 'bold',
        fontSize : 15,
        textAlign : 'center'
    }
})