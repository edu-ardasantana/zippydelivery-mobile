import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../../components/footer';

export default function ConfirmaPedido({ navigation }) {

    const [pedidoExiste, setPedidoExiste] = useState(true);

    useEffect(() => {
        setPedidoExiste(true);
    }, []);

    const handleCancelarPedido = () => {
        setPedidoExiste(false);
    };

    const handleVoltarTelaPrincipal = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleVoltarTelaPrincipal} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>
            </View>

            {pedidoExiste ? (
                <View style={styles.body}>
                    <Image style={styles.iconMessage} source={require('../../assets/images/successIcon.png')} />
                    <Text style={styles.title1}>Pedido realizado!</Text>
                    <Text style={styles.title2}>Você pode voltar para a tela principal</Text>
                    <TouchableOpacity onPress={handleCancelarPedido}>
                        <Text style={styles.title3}>Cancelar pedido</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.body}>
                    <Image style={styles.iconMessage} source={require('../../assets/images/successIcon.png')} />
                    <Text style={styles.title1}>Pedido cancelado!</Text>
                    <Text style={styles.title2}>Você pode voltar para a tela principal</Text>
                </View>
            )}
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#FF9431',
    },
    iconMessage: {
        width: 180,
        height: 170,
        marginBottom: 70,
        marginTop: 80,
    },
    title1: {
        color: '#FF9431',
        fontSize: 18,
        letterSpacing: 1.2,
        fontWeight: 'bold',
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 15,
        marginTop: 5,
    },
    title3: {
        color: '#AB222E',
        fontSize: 13,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 70,
    }
})