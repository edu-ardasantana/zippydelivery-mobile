import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export default function RecuperaSenha({ navigation }) {
    return (

        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require('/views/img/logo-removebg.png')}
            />

            <h2 style={styles.titulo}>Insira o e-mail da conta que deseja recuperar: </h2>

            <Input
                style={styles.input}
                placeholder='Email'
            />

            <View style={styles.botoesContainer}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textoBotao}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.textoBotao}>Enviar</Text>
                </TouchableOpacity>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000A0F',
        padding: '10%'
    },
    logo: {
        flexDirection: 'row',
        width: '30%',
        height: '15%',
        resizeMode: 'contain'
    },
    titulo: {
        color: '#E1E1E6',
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        marginTop: 20,
        width: 250
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#750310',
        padding: 10,
        borderRadius: 5,
        width: '45%', 
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
    }
});