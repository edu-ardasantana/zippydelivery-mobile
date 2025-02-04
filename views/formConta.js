import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { API_URL } from '../components/linkApi';

export default function FormConta({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [token, setToken] = useState('');
    const [id, setId] = useState(null);
    const [isEntregador, setIsEntregador] = useState(false);

    // Estados para armazenar os dados do usuário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [placa, setPlaca] = useState('');

    useEffect(() => {
        const fetchIdAndToken = async () => {
            try {
                const storedId = await AsyncStorage.getItem('id');
                const storedToken = await AsyncStorage.getItem('token');

                if (storedId && storedToken) {
                    setId(storedId);
                    setToken(storedToken);
                    verificarSeEhEntregador(storedId, storedToken);
                }
            } catch (error) {
                console.log('Erro ao recuperar o ID ou token do AsyncStorage:', error);
            }
        };

        fetchIdAndToken();
    }, []);

    // Função para verificar se o usuário é um entregador
    const verificarSeEhEntregador = (userId, token) => {
        axios.get(`${API_URL}/api/entregador/usuario/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data) {
                setIsEntregador(true);
                setNome(response.data.nome);
                setEmail(response.data.email);
                setVeiculo(response.data.veiculo);
                setPlaca(response.data.placa);
                setIdUsuario(response.data.id);
            } else {
                buscarDadosCliente(userId, token);
            }
        })
        .catch(() => {
            buscarDadosCliente(userId, token);
        });
    };

    // Caso não seja entregador, busca os dados do cliente
    const buscarDadosCliente = (userId, token) => {
        axios.get(`${API_URL}/api/cliente/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdUsuario(response.data.id);
        })
        .catch(error => {
            console.log(error);
            showMessage({
                message: `Erro ao buscar dados do cliente: ${error.message}`,
                type: "danger",
            });
        });
    };

    // Função para alterar os dados do usuário
    const alterarDados = () => {
        const url = isEntregador ? `${API_URL}/api/entregador/${idUsuario}` : `${API_URL}/api/cliente/${idUsuario}`;
        const data = isEntregador
            ? { nome, email, senha, veiculo, placa }
            : { nome, email, senha };

        axios.put(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            showMessage({ message: "Alteração realizada com sucesso!", type: "success" });
            navigation.navigate('ConfirmaAlteracao');
        })
        .catch(error => {
            console.log(error);
            showMessage({
                message: `Algo deu errado: ${error.message}`,
                type: "danger",
            });
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")} />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={{ marginBottom: 20, width: 300 }}>
                    <Input
                        leftIcon={<Image style={styles.icon} source={require("../assets/images/iconFooter/ic--twotone-edit.png")} />}
                        onChangeText={setNome}
                        value={nome}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                {isEntregador && (
                    <>
                        <View>
                            <Text style={styles.label}>Veículo</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setVeiculo}
                                value={veiculo}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Placa</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPlaca}
                                value={placa}
                            />
                        </View>
                    </>
                )}

                <Button
                    buttonStyle={styles.button}
                    title="Atualizar dados"
                    onPress={alterarDados}
                />

                <FlashMessage position="top" />
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
        width: 20,
        height: 20,
        tintColor: '#FF9431',
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
});

