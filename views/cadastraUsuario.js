import { API_URL } from '@/components/linkApi';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { TextInputMask } from 'react-native-masked-text';

export default function CadastraUsuario({ navigation }) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

    const inserirDados = async () => {
        const userData = {
            nome,
            cpf,
            email,
            senha,
        };

        try {
            const response = await axios.post(`${API_URL}/api/cliente`, userData);
            console.log("Resposta da API: ", response);

            // Define a mensagem de sucesso
            setSuccessMessage("Cadastro realizado com sucesso!");
            setErrorMessage(''); // Limpa qualquer mensagem de erro

            // Redireciona para a tela de login após 2 segundos
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error);

            // Define a mensagem de erro
            setErrorMessage("Algo deu errado. Por favor, tente novamente.");
            setSuccessMessage(''); // Limpa qualquer mensagem de sucesso
        }
    };
    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center' }}>

                <Image
                    style={styles.logo}
                    source={require('../assets/images/LogoNovo.png')}
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

            {/* <br /><br /> <br /><br /><br /><br /><br /> */}

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.googleSignInButton}>
                    <Image
                        style={styles.googleIcon}
                        source={require('../assets/images/simbolo-do-google.png')}
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
        paddingVertical: 10,
        paddingHorizontal: 50,
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