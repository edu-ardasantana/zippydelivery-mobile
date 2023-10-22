import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ItemSacola from './component/itemSacola';
import { Button } from 'react-native-elements';

export default function ResumoSacola({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.headerContent}>

                <TouchableOpacity onPress={() => navigation.navigate('Sacola')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>

                <Text style={styles.title}>SACOLA</Text>

                <TouchableOpacity >
                    <Text style={styles.limpar}>Limpar</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.enderecoTitle}>Resumo de valores</Text><br />

            <View style={styles.resumo}>
                <Text>Subtotal</Text> <Text>R$ 31,90</Text>
            </View>

            <View style={styles.resumo}>
                <Text>Taxa de entrega</Text> <Text>Grátis</Text>
            </View>

            <View style={styles.resumo}>
                <Text><strong>Total</strong></Text> <Text><strong>R$ 31,90</strong></Text>
            </View><br />

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            <Text style={styles.enderecoTitle}>Pagamento pelo app</Text>

            <View style={styles.endereco}>
                <Image style={styles.logoCartao} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/langpt-1500px-Mastercard_2019_logo.svg.png', }} />

                <Text style={styles.enderecoText}><span style={styles.span}>Crédito</span><br />Mastecard **** 0987
                </Text>

            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            <Text style={styles.enderecoTitle}>Confirme a entrega</Text>

            <View style={styles.endereco}>
                <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/ic:outline-delivery-dining.svg', }} />

                <Text style={styles.enderecoText}><span style={styles.span}>Entrega Hoje</span><br />Hoje, 40 - 50 min
                </Text>

            </View>

            <View style={styles.endereco}>
                <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />

                <Text style={styles.enderecoText}>Avenida do príncipe mimado, 267<br />Caxangá - Condomínio das flores bloco 02 apto 505
                </Text>

            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>



            <View style={styles.footerContainer}>

                <View style={styles.footer2}>

                    <TouchableOpacity style={styles.footerLink}>Alterar dados</TouchableOpacity>

                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Fazer pedido"
                    onPress={() => navigation.navigate('ConfirmaPedido')}
                />

            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // justifyContent: 'space-between',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    title: {
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 15,
    },
    limpar: {
        paddingHorizontal: 20,
        color: '#FF9431'
    },
    endereco: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    enderecoText: {
        fontSize: 10,
        justifyContent: 'space-between',
    },
    enderecoTitle: {
        fontWeight: 500,
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 15,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#dbdbe7',
    },
    menuIcon: {
        width: 20,
        height: 20,
        tintColor: '#FF9431',
        marginVertical: 20,
        marginHorizontal: 15,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 30,
        width: 300,
        borderRadius: 5
    },
    span: {
        fontSize: 13
    },
    logoCartao: {
        width: 50,
        height: 30,
        marginVertical: 20,
        marginHorizontal: 15,
    },
    resumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,

    },
    footerLink: {
        color: '#FF9431',
        alignSelf: 'center'
    }
});