import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import schema from '../schemas/loginSchema';

export default function Login({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const logar = async (data) => {
        const credentials = {
            username: data.email,
            password: data.senha,
        };

        axios.post('http://44.202.17.128:8080/api/login', credentials)
            .then(async function (response) {
                try {
                    console.log(response.data);

                    await AsyncStorage.setItem('id', response.data.id.toString());
                    await AsyncStorage.setItem('token', response.data.token);

                    navigation.navigate('Home');
                } catch (error) {
                    console.error('Erro ao salvar os dados no AsyncStorage', error);
                }
            })
            .catch(function (error) {
                showMessage({
                    message: 'Email ou senha inválidos!',
                    type: 'danger',
                });
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/LogoNovo.png')} />
            </View>

            <View style={styles.form}>

                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='exemplo@email.com'
                            placeholderTextColor='#C4C4CC'
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}


                <Text style={styles.label}>Senha</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='No mínimo 6 caracteres'
                            placeholderTextColor='#C4C4CC'
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="senha"
                />
                {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}


                <Button buttonStyle={styles.button} title="Entrar" onPress={handleSubmit(logar)} />
                <TouchableOpacity onPress={() => navigation.navigate('CadastraUsuario')}>
                    <Text style={styles.link}> Criar uma conta</Text>
                </TouchableOpacity>
                
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.googleSignIn}>
                <TouchableOpacity style={styles.googleSignInButton}>
                    <Image style={styles.googleIcon} source={require('../assets/images/simbolo-do-google.png')} />
                    <Text style={styles.googleButtonText}>Entre com o Google</Text>
                </TouchableOpacity>
            </View>
            <FlashMessage position="top" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '70%',
        height: 120,
        resizeMode: 'contain',
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4D585E'
    },
    input: {
        height: 48,
        paddingHorizontal: 10,
        backgroundColor: '#dbdbe749',
        marginBottom: 15,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#FF9431',
        height: 48,
        borderRadius: 5,
        marginBottom: 15,
    },
    link: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 15,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
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
    googleSignIn: {
        alignItems: 'center',
    },
    googleSignInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8ecf2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
    },
});
