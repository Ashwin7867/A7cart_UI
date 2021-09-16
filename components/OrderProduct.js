import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';

import getImageForProduct from '../utils/getImageForProduct';
import {getProductInfo} from '../api/cartscreenApi';
import {productPrice} from '../api/productsApi';

export default class OrderProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            product_price : '',
            image_name : '',
            unit : '',
            loading : false
        }
    }
    async componentDidMount(){
        this.setState({loading : true})
        const {product_url} = this.props;
        const product_data = await getProductInfo(product_url);
        const {title, attributes,images} = product_data;
        const price_url = product_url.concat("price/");
        const  {product_price,currency }= await productPrice(price_url);
        const imageurl = images[0]['original'];
        const temp = imageurl.split('/');
        const imgname = temp[temp.length - 1];
        const finalimgname = imgname.split('.')[0];
        const product_unit = attributes[2]['value']
        this.setState({
            title : title,
            product_price : product_price,
            image_name : finalimgname,
            unit : product_unit,
            loading : false
        })

    }
    render() {
        const {quantity, price_incl_tax} = this.props;
        const {title, product_price, image_name, unit, loading} = this.state;
        return (
            <View style={styles.container}>
            {!!loading && <ActivityIndicator color ="blue"
                                size = "small" /> }
                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={getImageForProduct(image_name)} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{title}</Text>
                    <Text style={styles.info}>{''.concat('Rs ', product_price, " * ", quantity)}</Text>
                </View>
                <View style={styles.priceInfo}>
                    <Text style={styles.price}>{''.concat("Rs ", price_incl_tax)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 100,
        width: 357,
        borderWidth: 1.4,
        borderColor: 'lightgray',

    },
    imageContainer: {
        paddingTop: 10
    },
    image: {
        height: 60,
        width: 80
    },
    productInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10
    },
    productName: {
        fontSize: 17
    },
    info: {
        color: 'gray',
        marginLeft: 4
    },
    priceInfo: {
        position : 'absolute',
        right : 7
    },
    price: {
        fontSize: 16,
    }
})