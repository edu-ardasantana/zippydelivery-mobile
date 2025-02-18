import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function PedidoConfirmado({ route }) {
  const navigation = useNavigation();
  const [pedido, setPedido] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [statusPagamento, setStatusPagamento] = useState('');
  const [statusPedido, setStatusPedido] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState({});
  const { idPedido } = route.params;

  useEffect(() => {
    const fetchPedidoData = async () => {
      try {
        const idPedido = await AsyncStorage.getItem('idPedido');
        if (idPedido) {
          const response = await axios.get(`https://zippydelivery-fea08-default-rtdb.firebaseio.com/pedidos/${idPedido}.json`);
          const pedidoData = response.data;

          setPedido(pedidoData);
          setCliente(pedidoData.cliente);
          setStatusPagamento(pedidoData.statusPagamento);
          setStatusPedido(pedidoData.statusPedido);
          setEnderecoEntrega(pedidoData.enderecoEntrega || {});
        }
      } catch (error) {
        console.error('Erro ao carregar o pedido:', error);
      }
    };

    fetchPedidoData();
  }, []);

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando pedido...</Text>
      </View>
    );
  }

  const enderecoCompleto = enderecoEntrega?.logradouro
    ? `${enderecoEntrega.logradouro}, ${enderecoEntrega.bairro}, ${enderecoEntrega.cidade}, ${enderecoEntrega.estado}, CEP: ${enderecoEntrega.cep}`
    : 'Endereço não disponível';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pedido Confirmado</Text>

      <View style={styles.orderDetails}>
        <Text style={styles.textBold}>Pedido ID:</Text>
        <Text style={styles.text}>{idPedido}</Text>

        <Text style={styles.textBold}>Cliente:</Text>
        <Text style={styles.text}>{cliente?.nome}</Text>

        <Text style={styles.textBold}>Endereço:</Text>
        <Text style={styles.text}>{enderecoCompleto}</Text>

        <Text style={styles.textBold}>Forma de pagamento:</Text>
        <Text style={styles.text}>{pedido?.formaPagamento}</Text>

        <Text style={styles.textBold}>Status do pagamento:</Text>
        <Text style={styles.text}>{statusPagamento}</Text>

        <Text style={styles.textBold}>Status do pedido:</Text>
        <Text style={styles.text}>{statusPedido}</Text>

        <Text style={styles.textBold}>Total:</Text>
        <Text style={styles.text}>R${pedido?.valorTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.orderItems}>
        <Text style={styles.subtitle}>Itens do Pedido:</Text>
        {pedido?.itens?.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Image source={{ uri: item?.imagem }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTextBold}>{item?.descricao}</Text>
              <Text style={styles.itemText}>Quantidade: {item?.qtdProduto}</Text>
              <Text style={styles.itemText}>Preço: R${item?.preco}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Voltar à Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f8f8f8' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  subtitle: { 
    fontSize: 22, 
    marginTop: 15, 
    marginBottom: 10, 
    fontWeight: '600',
    color: '#555'
  },
  text: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: '#555',
  },
  textBold: { 
    fontSize: 16, 
    marginBottom: 8, 
    fontWeight: 'bold', 
    color: '#333'
  },
  orderDetails: { 
    width: '100%', 
    marginBottom: 20, 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
  },
  orderItems: { 
    width: '100%', 
    marginBottom: 20 
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
  },
  itemImage: { 
    width: 80, 
    height: 80, 
    marginRight: 15, 
    borderRadius: 10 
  },
  itemDetails: { 
    flex: 1, 
    justifyContent: 'flex-start' 
  },
  itemText: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 5 
  },
  itemTextBold: { 
    fontSize: 14, 
    color: '#333', 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
