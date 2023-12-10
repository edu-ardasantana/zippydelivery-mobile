import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMyContext } from '../myContext';

export default function ItemSacola({item}) {

    const navigation = useNavigation();

    const { addToCart, delToCart, removeFromCart, cart } = useMyContext();
    const [selectedQuantity, _setSelectedQuantity] = useState(1);
  
  
    const getProductQuantity = (productId) => {
      const cartItem = cart.find((produto) => produto.id === productId);
      return cartItem ? cartItem.quantity : 1;
    };

    function formatarMoeda(dataParam) {
        return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
    }
    return (
        <View style={styles.slide}>

            <View style={styles.colum1}>
                <Image style={styles.itemImage} source={item.imagem} />
            </View>

            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>{item.titulo}</Text>   
                <Text style={[styles.title2, { color:  '#FF9431' }]}>{formatarMoeda(getProductQuantity(item.id)*item.preco)}</Text>
            </View>

            <View style={styles.line4 }>
                <TouchableOpacity onPress={()=>delToCart({...item, quantity: selectedQuantity })} style={styles.button}>
                    <Image style={[styles.icon, { width: 16 }]} source={{ uri: 'https://api.iconify.design/material-symbols:remove-rounded.svg' }} />
                </TouchableOpacity>

                <Text style={[styles.title2, { marginLeft: 20, marginRight: 20 }]}>{getProductQuantity(item.id)}</Text>

                <TouchableOpacity onPress={()=>addToCart({...item, quantity: selectedQuantity })} style={styles.button}>
                    <Image style={[styles.icon, { width: 16 }]} source={{ uri: 'https://api.iconify.design/material-symbols:add-rounded.svg' }} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        marginHorizontal: 7,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        justifyContent: 'space-between',
    },
    colum2: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    colum1: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 7,
        marginVertical: 10,
        marginRight: 7,

    },
    title2: {
        fontSize: 14,
        letterSpacing: 1.2,
        fontWeight: '550',
        color:'#FF9431'
    },
    nomeItem: {
        color: '#0D0D0D',
        fontSize: 13,
        fontWeight: '600',
    },
    descricao: {
        color: '#7C7C8A',
        fontSize: 12,
        fontWeight: '400',
    },
    icon: {
        tintColor: '#E1E1E6',
        width: 25,
        height: 25,
    },
    line4:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
    }
});
