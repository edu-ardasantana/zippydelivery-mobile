import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';

export default function CadastraUsuario({ navigation }) {
    return (

        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require('/views/img/logo-removebg.png')}
            />

            <View style={styles.body}>

                <Input
                    style={styles.input}
                    placeholder='Nome'
                />

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
                    title="Criar conta"
                    onPress={() => navigation.navigate('Login')}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}> Já tenho uma conta</Text>
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
    link: {
        color: '#E1E1E6',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15
    }
});