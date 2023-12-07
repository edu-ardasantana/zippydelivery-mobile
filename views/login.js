import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";

    export default function Login({ navigation }) {

    const [getEmail, setEmail] = useState('');
    const [getSenha, setSenha] = useState('');

    function logar() {
        const credentials = {
            username: getEmail,
            password: getSenha,
        };

        axios.post('http://localhost:8080/api/login', credentials)
            .then(function (response) {


                console.log(response.data)

                navigation.navigate('Home')
                window.localStorage.setItem("id",response.data.id)
                window.localStorage.setItem("token",response.data.token)
          
            })
            .catch(function (error) {
                showMessage({
                    message: `Email ou senha inválidos!`,
                    type: "danger",
                });
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image style={styles.logo} source={require('/views/img/LogoNovo.png')} />
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='exemplo@email.com'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={text => setEmail(text)}
                        value={getEmail}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='No mínimo 6 caracteres'
                        placeholderTextColor='#C4C4CC'
                        secureTextEntry={true}
                        onChangeText={text => setSenha(text)}
                        value={getSenha}
                    />

                    <View>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='exemplo@email.com'
                            placeholderTextColor='#C4C4CC'
                            onChangeText={text => setEmail(text)}
                            value={getEmail}
                        />

                    </View>


                    <View>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='No mínimo 6 caracteres'
                            placeholderTextColor='#C4C4CC'
                            secureTextEntry={true}
                            onChangeText={text => setSenha(text)}
                            value={getSenha}
                        />
                    </View>
                <Button buttonStyle={styles.button} title="Entrar" onPress={() => logar()} />
                <TouchableOpacity onPress={() => navigation.navigate('CadastraUsuario')}>
                    <Text style={styles.link}> Criar uma conta</Text>
                </TouchableOpacity>
                <FlashMessage position="top" />
            </View>
            <br /><br /> <br /><br /><br />
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.googleSignInButton}>
                    <Image style={styles.googleIcon} source={require('/views/img/simbolo-do-google.png')} />
                    <Text style={styles.googleButtonText}>Entre com o Google</Text>
                </TouchableOpacity>
                <FlashMessage position="top" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: '60%',
        height: '30%',
        resizeMode: 'contain',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4D585E'
    },
    input: {
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#dbdbe749',
        marginBottom: 10,
        borderRadius: 5,

    },
    button: {
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 40,
        width: 300,
        borderRadius: 5
    },
    link: {
        fontSize: 14,
        fontWeight: 500,
        marginTop: 30,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#dbdbe7',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#4D585E',
    },
    googleSignInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8ecf247',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        height: 50
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        color: '#4D585E',
        fontSize: 16,
    },
})

