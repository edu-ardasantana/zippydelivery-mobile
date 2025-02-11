import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/footer';
import Pedido from '../components/pedido';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/components/linkApi';

const FIREBASE_URL = 'https://zippydelivery-fea08-default-rtdb.firebaseio.com/pedidos.json';
const CLIENTE_API_URL = 'https://zippydelivery-v2-latest.onrender.com/api/cliente';

export default function Historico({ navigation }) {
  const [lista, setLista] = useState([]);
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    const fetchClienteId = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        console.log('User ID do AsyncStorage:', userId);

        if (!userId) {
          console.error('Nenhum ID encontrado no AsyncStorage');
          return;
        }

        const response = await axios.get(CLIENTE_API_URL);
        const clientes = response.data;

        const cliente = clientes.find((cliente) => cliente.usuario.id === parseInt(userId));
        
        if (cliente && cliente.id) {
          console.log('ID do cliente logado:', cliente.id);
          setClienteId(cliente.id);
        } else {
          console.error('Cliente não encontrado na API');
        }
      } catch (error) {
        console.error('Erro ao buscar o ID do cliente:', error);
      }
    };

    fetchClienteId();
  }, []);

  useEffect(() => {
    const carregarLista = async () => {
      if (!clienteId) return;

      try {
        const response = await axios.get(FIREBASE_URL);
        if (response.data) {
          const pedidosArray = Object.keys(response.data)
            .map((key) => ({
              id: key,
              ...response.data[key],
            }))
            .filter((pedido) => pedido.cliente.id === clienteId); 

          setLista(pedidosArray);
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos do Firebase:', error);
      }
    };

    carregarLista();
  }, [clienteId]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title1}>Seus pedidos anteriores</Text>
      </View>
      <ScrollView>
        <View style={styles.body}>
          {lista.map((pedido) => {
            let qtd = 0;
            let produtos = [];

            pedido.itens.forEach((item) => {
              qtd += item.qtdProduto;
              produtos.push(item.descricao);
            });

            return (
              <Pedido
                key={pedido.id}
                quantity={qtd}
                restaurantName={pedido.empresa?.nome || 'Restaurante desconhecido'}
                orderName={produtos[0] || 'Produto desconhecido'}
                orderStatus={pedido.statusPedido || 'Status desconhecido'}
                orderNumber={pedido.id}
                quantityItemsOrder={pedido.itens?.length || 0}
                onPress={() => navigation.navigate('DetalhePedido', { pedido })}
              />
            );
          })}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    headerContent: {
        flexDirection: 'column',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title1: {
        fontSize: 20,
        fontWeight: '645',
    },
    body: {
        alignItems: 'center',
    },
    bodyContent: {
        height: 160,
        width: '90%',
        borderRadius: 5,
        borderColor: '#E6E6E6',
        borderWidth: 1.4,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 15,
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    box: {
        width: '96%',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    infoGeral: {
        flexDirection: 'row',
        marginTop: 10,
    },
    infoEspecifica: {
        marginTop: 5,
        paddingLeft: 23,
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 5,
    },
    title3: {
        color: '#4D585E',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 5,
    },
    text: {
        color: '#7C7C8A',
        fontSize: 12,
        fontWeight: '400',
        padding: 10,
        letterSpacing: 1.2,
    },
    button: {
        width: '95%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
