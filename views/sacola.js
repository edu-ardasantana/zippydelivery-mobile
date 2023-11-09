import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ItemSacola from './component/itemSacola';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native';

export default function Sacola({ navigation }) {

    const listagemProdutos = [1, 2, 3];

    const [endereco, setEndereco] = useState();
    const isFocused = useIsFocused();

    const id = 2

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cliente/${id}`)
            .then(function(response) {
                setEndereco(response.data)
                console.log(endereco.logradouro)
            })
            .catch(function (error) {
                console.log(error)
            })
    })

    return (
        <View style={styles.container}>

            <View style={styles.headerContent}>

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/solar:alt-arrow-down-outline.svg' }} />
                </TouchableOpacity>

                <Text style={styles.title}>SACOLA</Text>

                <TouchableOpacity >
                    <Text style={styles.limpar}>Limpar</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => navigation.navigate('FormEndereco')}>
                <Text style={styles.enderecoTitle}>Entregar no endereço</Text>

                <View style={styles.endereco}>
                    <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />

                    <Text style={styles.enderecoText}><br />Caxangá - Condomínio das flores bloco 02 apto 505
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('FormEndereco')}>
                        <Text style={styles.limpar}>Trocar</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                </View>

            </TouchableOpacity>

            {listagemProdutos.map((index) => (
                <View key={index}>
                    <TouchableOpacity>
                        <ItemSacola />
                    </TouchableOpacity>
                </View>
            ))}

            <Text style={{ paddingHorizontal: 20, fontWeight: 600, marginVertical: 20 }}>Taxa de entrega: R$ 6,99</Text>

            <br />

            <View style={styles.footerContainer}>

                <View style={styles.footer2}>

                    <Text style={styles.footerText}>Total com a entrega</Text>

                    <Text style={styles.preco}>R$ 31,90</Text>

                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Continuar"
                    onPress={() => navigation.navigate('ResumoSacola')}
                />
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    icon: {
        width: 30,
        height: 30,
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
    },
    enderecoText: {
        marginStart: 5,
        fontSize: 10,
        justifyContent: 'space-between',
    },
    enderecoTitle: {
        fontWeight: 500,
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 20,
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
        marginVertical: 30,
        marginHorizontal: 15,
    },
    footerContainer: {
        justifyContent:'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        height: 60,
    },
    footer2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerText: {
        paddingRight:25
    },
    preco: {
        fontWeight: 'bold',
    },
    button: {
        alignSelf:'center',
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 30,
        width: 300,
        borderRadius: 5
    },
});