import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';

export default function Item() {

    const navigation = useNavigation();

    const [quantity, setQuantity] = useState(1);

    function incrementQuantity() { setQuantity(quantity + 1) }
    function decrementQuantity() { quantity > 0 && setQuantity(quantity - 1) }

    function formatarMoeda(dataParam) {
        return dataParam
            ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '';
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetalheItem')} style={styles.slide}>

            <View style={styles.colum1}>
                <Image style={styles.itemImage} source={require('../assets/images/item.png')} />
            
            </View>
            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>Salada Ravanello</Text>
                <Text style={[styles.title2, { color: '#FF9431' }]}>{formatarMoeda(44.90)}</Text>
            </View>

            <View style={styles.line4}>
                <TouchableOpacity onPress={decrementQuantity} style={styles.button}>
                    <Image style={[styles.icon, { width: 20 }]} source={require("../assets/images/iconFooter/material-symbols--remove-rounded.png")} />
                </TouchableOpacity>

                <Text style={[styles.title2, { marginLeft: 20, marginRight: 20 }]}>{quantity}</Text>

                <TouchableOpacity onPress={incrementQuantity} style={styles.button}>
                    <Image style={[styles.icon, { width: 20 }]} source={require("../assets/images/iconFooter/material-symbols--add-rounded.png")} />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    slide: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
       // marginVertical: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',

        //backgroundColor: "blue"
    },
    colum2: {
        flex: 1,
        marginLeft: 10,
    },
    colum1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: "red"
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 7,
        marginVertical: 5,
    },
    title2: {
        fontSize: 18,
        letterSpacing: 1.2,
        fontWeight: '550',
        color: '#FF9431',
    },
    nomeItem: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0D0D0D',
    },
    line4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    button: {
        padding: 5,
    },
    icon: {
        tintColor: '#A9A9A9',
        width: 25,
        height: 25,
    },
});
