import axios from 'axios';
import app from './firebaseConfig';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';

export default function Login({ navigation }) {

    const [getEmail, setEmail] = useState('');
    const [getSenha, setSenha] = useState('');

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    function formatarCPF(cpf) {
        return cpf.replace(/[^\d]/g, '');
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user.email)
            if (user.emailVerified) {
                try {
                    const response = await axios.get("https://api.invertexto.com/v1/faker?token=5837%7CKQxaDmKFbfnYsFegMKaTDkhBmACz43Hy&fields=cpf");
                    const cpf = response.data.cpf;
                    console.log(formatarCPF(cpf))
                    const newUser = {
                        nome: user.displayName,
                        cpf: formatarCPF(cpf),
                        email: user.email,
                        senha: user.uid
                    };
                    const users = await axios.get("http://api.projetopro.live/api/cliente");
                    const emailDoNovoUsuario = newUser.email;
                    const emailExiste = users.data.some(user => user.email === emailDoNovoUsuario)
                    if (emailExiste) {
                        await logarComGoogle(newUser.email, newUser.senha);
                    } else {
                        await registrarNovoUsuario(newUser);
                        await logarComGoogle(newUser.email, newUser.senha);
                    }
                } catch (error) {
                    console.error('Erro ao obter CPF ou criar usuário:', error);
                }
            } else {
                showMessage({
                    message: `Não foi possível verificar sua conta.`,
                    type: "danger",
                });
            }
        } catch (error) {
            console.error('Erro ao autenticar com o Google:', error);
        }
    }

    const registrarNovoUsuario = async (newUser) => {
        try {
            await axios.post('http://api.projetopro.live/api/cliente', newUser);
        } catch (error) {
            console.error('Erro ao registrar novo usuário:', error);
            throw error;
        }
    };

    const logarComGoogle = async (email, uid) => {
        const credentials = {
            username: email,
            password: uid,
        };

        try {
            const response = await axios.post('http://api.projetopro.live/api/login', credentials);
            window.localStorage.setItem("id", response.data.id);
            window.localStorage.setItem("token", response.data.token);
            navigation.navigate('Home');
        } catch (error) {
            axios.post('http://api.projetopro.live/api/login', credentials)
                .then(function (response) {
                    navigation.navigate('Home')
                    window.localStorage.setItem("id", response.data.id)
                    window.localStorage.setItem("token", response.data.token)
                })
                .catch(function (error) {
                    showMessage({
                        message: `Email ou senha inválidos!`,
                        type: "danger",
                    });
                    console.error('Erro ao fazer login:', error);
                })
        };
    }

    function logar() {
        const credentials = {
            username: getEmail,
            password: getSenha,
        };

        axios.post('http://api.projetopro.live/api/login', credentials)
            .then(function (response) {
                navigation.navigate('Home')
                window.localStorage.setItem("id", response.data.id)
                window.localStorage.setItem("token", response.data.token)
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

                <Image style={styles.logo} source={require('../views/img/LogoNovo.png')} />
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

                    <Button buttonStyle={styles.button} title="Entrar" onPress={() => logar()} />
                    <TouchableOpacity onPress={() => navigation.navigate('CadastraUsuario')}>
                        <Text style={styles.link}> Criar uma conta</Text>
                    </TouchableOpacity>
                    <FlashMessage position="top" />
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ou</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={signInWithGoogle} style={styles.googleSignInButton}>
                        <Image style={styles.googleIcon} source={require('../views/img/simbolo-do-google.png')} />
                        <Text style={styles.googleButtonText}>Entre com o Google</Text>
                    </TouchableOpacity>
                    <FlashMessage position="top" />
                </View>
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
        alignSelf: 'center'
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
