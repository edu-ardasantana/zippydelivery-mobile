import axios from 'axios';
import { useMyContext } from './myContext';
import { Button } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { API_URL } from '@/components/linkApi';

export default function ResumoSacola({ navigation, route }) {
  const { cupomInfo } = route.params;
  const valorDesconto = cupomInfo ? cupomInfo.percentualDesconto / 100 : 0.00;
  const [id, setId] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [token, setToken] = useState('');

  const [getEndereco, setEndereco] = useState({});
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [url, setUrl] = useState('');
  const [getCliente, setCliente] = useState();

  const { cart, setCart } = useMyContext();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      const storedId = await AsyncStorage.getItem("id");
      const storedIdEmpresa = await AsyncStorage.getItem("idEmpresa");
      const storedToken = await AsyncStorage.getItem("token");
      setId(storedId);
      setIdEmpresa(storedIdEmpresa);
      setToken(storedToken);
    };

    fetchTokenAndData();
  }, []);

  // Fetch Cliente data
  useEffect(() => {
    if (id && token) {
      axios.get(`${API_URL}/api/cliente/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setEndereco(response.data.endereco);
        setCliente(response.data);
      })
      .catch(error => console.log(error));
    }
  }, [id, token]);

  // Fetch Empresa and Payment Methods
  useEffect(() => {
    if (idEmpresa) {
      axios.get(`${API_URL}/api/empresa/${idEmpresa}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setFormasPagamento(response.data.formasPagamento);
      })
      .catch(error => console.log(error));
    }
  }, [idEmpresa]);

  const calcularTotalCompras = () => {
    return cart.reduce((total, item) => total + (item.preco * item.quantity), 0);
  };

  const valorTotal = calcularTotalCompras();

  const taxaFrete = cart[0]?.categoria?.empresa?.taxaFrete || 0;
  const color = taxaFrete === 0 ? "#39cd39" : "#FF9431";

  const listaFormasPagamentos = [
    { label: "Selecione...", value: "" },
    ...formasPagamento.map(forma => ({ label: forma, value: forma }))
  ];

  const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  function fazerPedido(cart) {
    const carrinho = cart.map(item => ({
      descricao: item.titulo,
      imagem: item.imagem,
      preco: item.preco,
      qtdProduto: item.quantity,
    }));

    const pedidoDinamico = {
      cliente: getCliente,
      dataHora: new Date().toISOString(),
      empresa: {
        id: parseInt(idEmpresa),
        nome: "Pizzaria da Jamilly",
      },
      enderecoEntrega: getEndereco,
      formaPagamento: selectedPayment,
      statusPagamento: "Pago",
      statusPedido: "Pendente",
      taxaEntrega: taxaFrete,
      valorTotal: valorTotal + taxaFrete,
      itens: carrinho,
    };

    axios.post(`https://zippydelivery-fea08-default-rtdb.firebaseio.com/pedidos.json`, pedidoDinamico)
      .then(response => {
        AsyncStorage.setItem('idPedido', response.data.name);
        navigation.navigate("PedidoConfirmado", response.data);
      })
      .catch(error => console.log("Erro na requisição:", error));
  }

  function mercadoPago(cart) {
    const items = cart.map(element => ({
      title: element.titulo,
      id: element.id,
      quantity: element.quantity,
      unit_price: element.preco * (1 - valorDesconto),
      currency_id: 'BRL',
    }));

    axios.post('https://api.mercadopago.com/checkout/preferences', {
      items,
      auto_return: "approved",
      back_urls: { success: "http://localhost:19006/PedidoConfirmado" },
      shipments: { cost: taxaFrete },
    }, {
      headers: { 'Authorization': `Bearer APP_USR-1980238996971813-112320-8d04c96e13a81ac5d6c8e1a31397f802-1561790253` }
    })
    .then(response => {
      setUrl(response.data.init_point);
      navigation.navigate('Pagamento', { url: response.data.init_point });
    })
    .catch(error => {
      if (error.response) {
        // O pedido foi feito e o servidor respondeu com um código de erro
        console.error('Erro de requisição:', error.response.status);
        console.error('Detalhes do erro:', error.response.data);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Erro na requisição:', error.request);
      } else {
        // Algum outro erro ocorreu durante a configuração da requisição
        console.error('Erro desconhecido:', error.message);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.navigate("Sacola")}>
          <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>SACOLA</Text>
      </View>

      <Text style={styles.subTitle}>Resumo de valores</Text>
      <View style={styles.resumo}>
        <Text>Subtotal</Text>
        <Text>{formatarMoeda(valorTotal)}</Text>
      </View>

      {cupomInfo && (
        <View style={styles.resumo}>
          <Text>Cupom de desconto</Text>
          <Text style={{ color: "#39cd39" }}>{formatarMoeda(valorTotal * valorDesconto)}</Text>
        </View>
      )}

      <View style={styles.resumo}>
        <Text>Taxa de entrega</Text>
        <Text style={{ color: color }}>
          {taxaFrete === 0 ? 'Grátis' : formatarMoeda(taxaFrete)}
        </Text>
      </View>

      <View style={styles.resumo}>
        <Text>Total</Text>
        <Text>{formatarMoeda(valorTotal * (1 - valorDesconto) + taxaFrete)}</Text>
      </View>

      <Picker
        style={styles.input}
        selectedValue={selectedPayment}
        onValueChange={(itemValue) => setSelectedPayment(itemValue)}
      >
        {listaFormasPagamentos.map(forma => (
          <Picker.Item key={forma.value} label={forma.label} value={forma.value} />
        ))}
      </Picker>

      <Button
        title="Fazer pedido"
        onPress={() => {
          if (selectedPayment.toLowerCase() === 'dinheiro') {
            fazerPedido(cart);
          } else {
            mercadoPago(cart);
          }
        }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20, // Evita sobreposição com o footer
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "#FF9431",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4D585E",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#FF9431",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
