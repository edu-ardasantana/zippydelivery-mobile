import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';

export default function Menu({ navigation }) {
  const [nome, setNome] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id'); // Recupera o ID armazenado
        if (storedId) {
          setId(storedId);
        } else {
          console.warn('ID não encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://192.168.1.16:8080/api/cliente/findByUser/${id}`)
        .then((response) => {
          const data = response.data;
          setNome(data.nome);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do cliente:', error);
        });
    }
  }, [id]);

  const nomeUser = nome;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.infoNameUser}>{nomeUser},</Text>
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
