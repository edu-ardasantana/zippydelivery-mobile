import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';
import { API_URL } from '@/components/linkApi';

export default function Menu({ navigation }) {
  const [nome, setNome] = useState('');
  const [id, setId] = useState(null);
  const [token, setToken] = useState('');

  // Carregar o token
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        console.log("tokenMenu", token)
        setToken(storedToken);  // Atualiza o token
      }
    };
    fetchToken();  // Carrega o token ao inicializar o componente
  }, []);

  // Carregar o ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');  // Recupera o ID armazenado
        if (storedId) {
          console.log("id", storedId)
          setId(storedId);  // Atualiza o ID
        } else {
          console.warn('ID não encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do AsyncStorage:', error);
      }
    };

    fetchUserId();  // Carrega o ID
  }, []);

  // Buscar dados do cliente quando ID e token estiverem definidos
  useEffect(() => {
    if (id && token) {
      axios
        .get(`${API_URL}/api/cliente/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Adicionando o token ao cabeçalho
          }
        })
        .then((response) => {
          const data = response.data;
          setNome(data.nome);
          console.log("Nome do cliente:", data.nome);  // Debugging: mostra o nome do cliente
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do cliente:', error);
          // Adicionar um tratamento de erro aqui, caso necessário
        });
    }
  }, [id, token]);  // Requisitar dados quando 'id' ou 'token' mudarem

  const nomeUser = nome;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.infoNameUser}>{nomeUser}</Text>
          <Text style={styles.infoText}>o que você quer fazer agora?</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('FormConta')}
          >
            <Text style={styles.optionText}>Configuração da conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('FormEndereco')}
          >
            <Text style={styles.optionText}>Endereço de entrega</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Exit')}
          >
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    paddingLeft: 30,
  },
  info: {
    marginTop: 80,
    marginBottom: 50,
  },
  infoNameUser: {
    color: '#0D0D0D',
    fontSize: 20,
    fontWeight: '600',
  },
  infoText: {
    color: '#FF9431',
    fontSize: 14,
    fontWeight: '500',
  },
  options: {
    width: '94%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  option: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4CC',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4D585E',
    paddingLeft: 5,
  },
});
