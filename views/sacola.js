import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import ItemSacola from './component/itemSacola';

export default function Sacola({ navigation }) {

    localStorage.setItem("var", "sacola");
    const listagemProdutos = [1, 2, 3];

    const [getEndereco, setEndereco] = useState([]);
    const isFocused = useIsFocused();

    const id = window.localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cliente/findByUser/`+id)
            .then(function (response) {
                console.log(response.data)
                setEndereco(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })
    }, [isFocused])


    let enderecoCompleto;
    if (getEndereco.logradouro == null) {
        enderecoCompleto = null;
    } else {
        enderecoCompleto = `${getEndereco.logradouro} - ${getEndereco.bairro}, ${getEndereco.cidade} - ${getEndereco.estado} \n${getEndereco.complemento} `;
    }

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

            <TouchableOpacity onPress={() => navigation.navigate('FormEndereco')} >
                <Text style={styles.enderecoTitle}>Entregar no endereço</Text>

                {enderecoCompleto == null ?

                    <View style={styles.semEndereco}>

                        <TouchableOpacity onPress={() => navigation.navigate('FormEndereco')}>
                            <Text style={styles.limpar}>Escolher endereço</Text>
                        </TouchableOpacity>

                    </View>

                    :

                    <View style={styles.endereco}>
                        <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />

                        <Text style={styles.enderecoText}>{enderecoCompleto}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('FormEndereco')}>
                            <Text style={styles.limpar}>Trocar</Text>
                        </TouchableOpacity>

                    </View>



                }


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
        color: '#FF9431',
        fontWeight: '600'
    },
    semEndereco: {
        padding: 20,
        alignItems: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#FF9431'
    },
    endereco: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    enderecoText: {
        marginStart: 5,
        fontSize: 14,
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
        justifyContent: 'center',
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
        paddingRight: 25
    },
    preco: {
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 30,
        width: 300,
        borderRadius: 5
    },
});