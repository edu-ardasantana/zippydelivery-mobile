import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function Pedido({quantity, restaurantName, orderName, orderStatus, orderNumber, quantityItemsOrder, onPress}) {
    
    const uriStatus = 'https://api.iconify.design/grommet-icons/status-warning.svg?color=%23f8da45&width=50&height=50'
    if (orderStatus === 'Concluído'){
        uriStatus = 'https://api.iconify.design/material-symbols:check-circle.svg'
    }else if (orderStatus === 'Cancelado'){
        uriStatus = 'https://api.iconify.design/pajamas/canceled-circle.svg?color=red&width=50&height=50&flip=vertical'
    }

    return (
        <View style={styles.bodyContent}>
            <View style={styles.box}>
                <Image style={[styles.icon, { tintColor: '#0D0D0D' }]} source={{ uri: 'https://api.iconify.design/carbon:restaurant.svg' }} />
                <Text style={styles.title2}>{restaurantName}</Text>
            </View>
            <View style={[styles.box, { flexDirection: 'column', }]}>
                <View style={styles.infoGeral}>
                    <Image style={[styles.icon, { margin: 0 }]} source={{ uri:uriStatus}} />
                    <Text style={styles.title3}>Pedido {orderStatus} • Nº {orderNumber}</Text>
                </View>
                <View style={styles.infoEspecifica}>
                    <Text style={styles.title3}>{1} {orderName}</Text>
                    {
                        quantityItemsOrder > 1 ? (<Text style={[styles.title3, { color: '#4D585E' }]}>mais {quantity - 1} itens</Text>) : ('')
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={(onPress)}>
                <Text style={{ color: '#FF9431', fontWeight: '450' }}>ver detalhes</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContent: {
        height: 150,
        width: '90%',
        borderRadius: 5,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: -1,
            height: 0.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    box: {
        width: '96%',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    infoGeral: {
        flexDirection: 'row',
        marginTop: 10,
    },
    infoEspecifica: {
        marginTop: 5,
        paddingLeft: 23,
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 5,
    },
    title3: {
        color: '#4D585E',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 5,
    },
    button: {
        width: '95%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
})