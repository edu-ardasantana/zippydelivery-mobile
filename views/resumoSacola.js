import axios from 'axios';
import { useMyContext } from './myContext';
import { Button } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@/components/linkApi';
import { Linking } from 'react-native'; 

export default function ResumoSacola({ navigation, route }) {
  const { cupomInfo } = route.params;
  const valorDesconto = cupomInfo ? cupomInfo.percentualDesconto / 100 : 0.00;
  const [id, setId] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [getEmpresa, setEmpresa] = useState(null);
  const [token, setToken] = useState('');

  const [getEndereco, setEndereco] = useState({});
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [url, setUrl] = useState('');
  const [getCliente, setCliente] = useState();
  const [selectedEndereco, setSelectedEndereco] = useState(0);  // Define o estado para o índice do endereço selecionado

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
        console.log("Dados do cliente:", response.data);  // Adicionando log para inspecionar os dados
        if (response.data) {
          setEndereco(response.data.enderecos);
          setCliente(response.data);
        } else {
          console.log("Endereço não encontrado.");
        }
      })
      .catch(error => console.log("Erro ao buscar cliente:", error));
    }
  }, [id, token]);

  // Fetch Empresa and Payment Methods
  useEffect(() => {
    if (idEmpresa) {
      axios.get(`${API_URL}/api/empresa/${idEmpresa}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log('dados da empresa ', response.data);
        if (response.data){
          setFormasPagamento(response.data.formasPagamento);
          setEmpresa(response.data)
        }else {
          console.log("Empresa não Encontrada");
        }
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
console.log("empresa ", getEmpresa)
  function fazerPedido(cart) {
    const carrinho = cart.map(item => ({
      descricao: item.titulo,
      imagem: item.imagem,
      preco: item.preco,
      qtdProduto: item.quantity,
    }));

    const pedidoDinamico = {
      cliente: {
        cpf: getCliente.cpf,
        email: getCliente.email,
        id: getCliente.id,
        nome: getCliente.nome
      },
      dataHora: new Date().toISOString(),
      empresa: {
        id: parseInt(idEmpresa),
        nome: getEmpresa.nome,
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
        navigation.navigate("ConfirmaPedido", response.data);
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
      headers: { 'Authorization': `Bearer TEST-4306716972492066-021112-1acc393534dbdfe61465cf542d004115-190799322` }
    })
    .then(response => {
      const pagamentoUrl = response.data.init_point; // URL do Mercado Pago
      Linking.openURL(pagamentoUrl); // Abre o link no navegador.
    })
    .catch(error => {
      if (error.response) {
        console.error('Erro de requisição:', error.response.status);
        console.error('Detalhes do erro:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    });
  }



  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.navigate("Sacola")}
          style={styles.iconWrapper}>
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

       {/* Exibir o endereço */}
      

       <View style={styles.resumo2}>
  <Text style={styles.enderecoTitulo}>Endereço de Entrega</Text>
  {getEndereco && getEndereco.length > 0 ? (
    <Picker
      style={styles.input}
      selectedValue={selectedEndereco}  // Atribui o índice do endereço selecionado
      onValueChange={(itemValue) => setSelectedEndereco(itemValue)}  // Atualiza o índice ao mudar a seleção
    >
      {getEndereco.map((endereco, index) => (
        <Picker.Item
          key={index}
          label={`${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}`}  // Exibe o endereço no Picker
          value={index}  // Atribui o índice como valor
        />
      ))}
    </Picker>
  ) : (
    <Text>Endereço não disponível</Text>
  )}
</View>





<View style={styles.resumo2}>
  <Text style={styles.formaPagamentoTitulo}>Forma de Pagamento</Text>
  <Picker
    style={styles.input}
    selectedValue={selectedPayment}
    onValueChange={(itemValue) => setSelectedPayment(itemValue)}
  >
    {listaFormasPagamentos.map(forma => (
      <Picker.Item key={forma.value} label={forma.label} value={forma.value} />
    ))}
  </Picker>
</View>


      <TouchableOpacity 
  style={styles.button} 
  onPress={() => {
    if (selectedPayment.toLowerCase() === 'dinheiro') {
      fazerPedido(cart);
    } else {
      mercadoPago(cart);
    }
  }}
>
  <Text style={styles.buttonText}>Fazer pedido</Text>
</TouchableOpacity>

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
    justifyContent: "center",  // Isso garante que o título fique no centro
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  iconWrapper: {
    position: 'absolute',  // Isso garante que o ícone fique fixado na esquerda
    left: 20,  // Ajuste a distância da borda esquerda
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  resumo2: {
    flexDirection: "column", // Usar coluna para garantir que o título e o picker fiquem um abaixo do outro
    justifyContent: "flex-start", // Alinhar para o topo
    alignItems: "stretch", // Preencher a largura disponível
    backgroundColor: "#F9F9F9",
    paddingVertical: 20,
    //paddingHorizontal: 2,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  enderecoTitulo: {
    fontWeight: "bold", // Título em negrito
    fontSize: 16, // Tamanho da fonte
    color: "#4D585E", // Cor do texto
    marginBottom: 8, // Espaçamento entre o título e o Picker
    marginLeft: 5,
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
  formaPagamentoTitulo: {
    fontWeight: "bold", // Título em negrito
    fontSize: 16, // Tamanho da fonte
    color: "#4D585E", // Cor do texto
    marginBottom: 8, // Espaçamento entre o título e o Picker
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#FF9431", // Cor de fundo do botão
    paddingVertical: 12, // Aumenta a altura do botão
    borderRadius: 8, // Borda arredondada
    alignItems: "center", // Alinha o texto ao centro
    marginHorizontal: 20, // Espaçamento das laterais
    marginTop: 20, // Espaço superior
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 4 }, // Posição da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 6, // Difusão da sombra
    elevation: 5, // Elevação (sombra no Android)
  },

  buttonText: {
    color: "#FFF", // Cor do texto
    fontWeight: "bold", // Peso da fonte
    fontSize: 16, // Tamanho da fonte
  },
});
