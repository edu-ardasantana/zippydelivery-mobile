import React from 'react';
import {  View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';

export default function Login({ navigation }) {
    return (

        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('/views/img/logo-removebg.png')}
            />

            <View style={styles.body}>
                <Input
                    style={styles.input}
                    placeholder='Email'
                />
                <Input
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                />

                <Button
                    buttonStyle={styles.button}
                    title="Entrar"
                    onPress={() => navigation.navigate('Home')}
                />

                <SocialIcon
                    style={styles.buttonGoogle}
                    title='Login com Google'
                    button
                    type='google'
                    onPress={() => navigation.navigate('Home')}
                    
                />

                <TouchableOpacity onPress={() => navigation.navigate('RecuperaSenha')}>
                    <Text style={styles.link}> Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CadastraUsuario')}>
                    <Text style={styles.link}> Criar uma conta</Text>
                </TouchableOpacity>

            </View>



        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000A0F'
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: '60%',
        height: '30%',
        resizeMode: 'contain'
    },
    input: {
        marginTop: 20,
        width: 300
    },
    button: {
        marginTop: 20,
        backgroundColor: '#750310',
        height: 40,
        width: 300
    },
    buttonGoogle: {
        marginTop: 20,
        height: 40,
        width: 250
    },
    link: {
        color: '#E1E1E6',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10
    }
});