import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../../components/footer';

export default function SemPedidos({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Text style={styles.title1}>Seus pedidos anteriores</Text>
            </View>
            <View style={styles.body}>
                <Image style={styles.iconMessage} source={require('../../assets/images/noOrderIcon.png')} />
                <Text style={styles.title2}>Sem histórico de pedidos...</Text>
            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContent: {
        flexDirection: 'column',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconMessage: {
        width: 180,
        height: 170,
        marginBottom: 30,
        marginTop: 130,
    },
    title1: {
        fontSize: 20,
        fontWeight: '645',
    },
    title2: {
        color: '#D5D5D5',
        fontSize: 18,
        letterSpacing: -0.2,
        fontWeight: '600',
    },
    
})