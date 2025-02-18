import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/components/linkApi';

export default function ListAddress({ navigation }) {
    const [enderecos, setEnderecos] = useState([]);
    const [token, setToken] = useState(null);
    const [clienteId, setClienteId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedId = await AsyncStorage.getItem('id');
                
                if (!storedToken || !storedId) {
                    showMessage({ message: "Usuário não autenticado.", type: "danger" });
                    return;
                }

                setToken(storedToken);
                
                // Buscar ID do cliente
                const responseCliente = await axios.get(`${API_URL}/api/cliente/user/${storedId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });

                const clienteId = responseCliente.data?.id;
                if (!clienteId) {
                    showMessage({ message: "Erro ao obter o ID do cliente", type: "danger" });
                    return;
                }

                setClienteId(clienteId);

                // Buscar endereços do cliente
                const responseEnderecos = await axios.get(`${API_URL}/api/cliente/${clienteId}/endereco`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });

                setEnderecos(responseEnderecos.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                showMessage({ message: "Erro ao carregar dados", description: error.message, type: "danger" });
            }
        };

        fetchData();
    }, []);

    const selecionarEndereco = async (endereco) => {
        try {
            await AsyncStorage.setItem("enderecoSelecionado", JSON.stringify(endereco));
            showMessage({ message: `Endereço selecionado: ${endereco.descricao}`, type: "success" });
            await definirComoDefault(endereco.id);
            navigation.navigate('Home', { enderecoSelecionado: endereco });
        } catch (error) {
            showMessage({ message: 'Erro ao selecionar endereço.', type: 'danger' });
        }
    };

    const definirComoDefault = async (enderecoId) => {
        try {
            await axios.put(`${API_URL}/api/cliente/${clienteId}/endereco/padrao/${enderecoId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            showMessage({ message: "Erro ao definir endereço como padrão", type: "danger" });
        }
    };

    const renderEndereco = ({ item, index }) => (
        <TouchableOpacity onPress={() => selecionarEndereco(item)} style={styles.enderecoContainer}>
            <Text style={styles.enderecoText}><Text style={styles.bold}>Endereço {index + 1}: </Text>{item.descricao}</Text>
            <Text style={styles.enderecoText}><Text style={styles.bold}>Logradouro: </Text>{item.logradouro}</Text>
            <Text style={styles.enderecoText}><Text style={styles.bold}>Bairro: </Text>{item.bairro}</Text>
            <Text style={styles.enderecoText}><Text style={styles.bold}>Cidade: </Text>{item.cidade} - {item.estado}</Text>
            <Text style={styles.enderecoText}><Text style={styles.bold}>CEP: </Text>{item.cep}</Text>
            <Text style={styles.enderecoText}><Text style={styles.bold}>Complemento: </Text>{item.complemento}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Endereços</Text>

            {enderecos.length > 0 ? (
                <FlatList
                    data={enderecos}
                    renderItem={renderEndereco}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text style={styles.emptyMessage}>Nenhum endereço encontrado.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF9431',
        textAlign: 'center',
        paddingVertical: 20,
    },
    enderecoContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    enderecoText: {
        fontSize: 16,
        color: '#4D585E',
    },
    bold: {
        fontWeight: 'bold',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});
