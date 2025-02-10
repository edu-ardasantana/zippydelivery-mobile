import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@/components/linkApi';  // Certifique-se de que isso aponta para a URL correta da sua API

export default function PedidoConfirmado() {
  const navigation = useNavigation();
  const [pedido, setPedido] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [statusPagamento, setStatusPagamento] = useState('');
  const [statusPedido, setStatusPedido] = useState('');

  useEffect(() => {
    const fetchPedidoData = async () => {
      try {
        const idPedido = await AsyncStorage.getItem('idPedido');
        if (idPedido) {
          // Recupera os detalhes do pedido
          const response = await axios.get(`https://zippydelivery-fea08-default-rtdb.firebaseio.com/pedidos.json`);
          const pedidoData = response.data;

          setPedido(pedidoData);
          setCliente(pedidoData.cliente);
          setStatusPagamento(pedidoData.statusPagamento);
          setStatusPedido(pedidoData.statusPedido);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido Confirmado</Text>

      <View style={styles.orderDetails}>
  <Text style={styles.text}>Pedido ID: {pedido?.id ?? 'N/A'}</Text>
  <Text style={styles.text}>Cliente: {cliente?.nome ?? 'N/A'}</Text>
  <Text style={styles.text}>Endereço: {cliente?.endereco?.rua ?? 'N/A'}, {cliente?.endereco?.numero ?? 'N/A'}</Text>
  <Text style={styles.text}>Forma de pagamento: {pedido?.formaPagamento ?? 'N/A'}</Text>
  <Text style={styles.text}>Status do pagamento: {statusPagamento ?? 'N/A'}</Text>
  <Text style={styles.text}>Status do pedido: {statusPedido ?? 'N/A'}</Text>
  <Text style={styles.text}>Total: {pedido?.valorTotal ?? 'N/A'}</Text>
</View>

<View style={styles.orderItems}>
  <Text style={styles.subtitle}>Itens do Pedido:</Text>
  {pedido?.itens?.map((item, index) => (
    <View key={index} style={styles.itemRow}>
      <Image source={{ uri: item?.imagem }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item?.descricao ?? 'Sem descrição'}</Text>
      <Text style={styles.itemText}>Quantidade: {item?.qtdProduto ?? 0}</Text>
      <Text style={styles.itemText}>Preço: {item?.preco ?? 'N/A'}</Text>
    </View>
  ))}
</View>


      <Button
        title="Voltar à Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 20, marginTop: 10, marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  orderDetails: { marginBottom: 20 },
  orderItems: { width: '100%', marginBottom: 20 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemImage: { width: 50, height: 50, marginRight: 10 },
  itemText: { fontSize: 14, marginLeft: 10 },
});
