import axios from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { TextInputMask } from 'react-native-masked-text';
import app from './firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function CadastraUsuario({ navigation }) {


    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    function formatarCPF(cpf) {
        // Remove os pontos e hífen da string utilizando expressões regulares
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
                const users = await axios.get("http://localhost:8080/api/cliente");
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
                await axios.post('http://localhost:8080/api/cliente', newUser);
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
                const response = await axios.post('http://localhost:8080/api/login', credentials);
                window.localStorage.setItem("id", response.data.id);
                window.localStorage.setItem("token", response.data.token);
                navigation.navigate('Home');
            } catch (error) {
                showMessage({
                    message: `Email ou senha inválidos!`,
                    type: "danger",
                });
                console.error('Erro ao fazer login:', error);
            }
        };

    const inserirDados = () => {
        const userData = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha
        };

        axios.post('http://localhost:8080/api/cliente', userData)
            .then(function (response) {
                console.log(response);
                showMessage({
                    message: "Cadastro realizado com sucesso!",
                    type: "success"
                });
            })
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    };
    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center' }}>

                <Image
                    style={styles.logo}
                    source={require('../views/img/LogoNovo.png')}
                />

                <View>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Exemplo: Maria da Silva'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                    />

                </View>

                <View>

                    <Text style={styles.label}>CPF</Text>
                    <TextInputMask
                        style={styles.input}
                        type={'cpf'}
                        placeholder='000.000.000-00'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={(text) => setCpf(text)}
                        value={cpf}
                    />

                </View>

                <View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Exemplo: exemplo@email.com'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                </View>

                <View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='No mínimo 6 caracteres'
                        placeholderTextColor='#C4C4CC'
                        secureTextEntry={true}
                        onChangeText={(text) => setSenha(text)}
                        value={senha}
                    />
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Criar conta"
                    onPress={() => {
                        inserirDados();
                    }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}> Já tenho uma conta</Text>
                </TouchableOpacity>

            </View>

            <br /><br /> <br /><br /><br /><br /><br />

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={signInWithGoogle} style={styles.googleSignInButton}>
                    <Image
                        style={styles.googleIcon}
                        source={require('../views/img/simbolo-do-google.png')}
                    />
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
});