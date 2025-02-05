import axios from 'axios';
import { useMyContext } from './myContext';
import { Button } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage
import { Picker } from '@react-native-picker/picker';

import { API_URL } from '@/components/linkApi';

export default function ResumoSacola({ navigation, route }) {
  const { cupomInfo } = route.params;
  console.log(cupomInfo);
  const valorDesconto = cupomInfo === null ? 0.00 : cupomInfo.percentualDesconto / 100;

  const [id, setId] = useState(null);
  const [idEmpresa, setIdEmpresa] = useState(null);
  const [token, setToken] = useState('');

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

  const { cart, setCart } = useMyContext();
  const calcularTotalCompras = (carrinho) => {
    let total = 0;
    carrinho.forEach((item) => {
      const precoTotalItem = item.preco * item.quantity;
      total += precoTotalItem;
    });
    return total;
  };

  const valorTotal = calcularTotalCompras(cart);
  const taxaFrete = cart[0].categoria.empresa.taxaFrete === 'Grátis' ? 0.00 : cart[0].categoria.empresa.taxaFrete;
  const isFocused = useIsFocused();

  const color = taxaFrete === 0.00 ? "#39cd39" : "#FF9431";
  const [getEndereco, setEndereco] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [url, setUrl] = useState('');
  const [go, setGo] = useState(false);
  const [pagamentoNaEntrega, setPagamentoNaEntrega] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/api/cliente/user/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(function (response) {
          setEndereco(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isFocused, id]);

  useEffect(() => {
    if (idEmpresa) {
      axios.get(`${API_URL}/api/empresa/${idEmpresa}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(function (response) {
          setFormasPagamento(response.data.formasPagamento);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [idEmpresa]);

  let enderecoCompleto;
  if (getEndereco.enderecos && getEndereco.enderecos.length > 0) {
    const endereco = getEndereco.enderecos[0];  
    if (endereco.logradouro == null) {
      enderecoCompleto = null;
    } else {
      enderecoCompleto = `${endereco.logradouro} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado} \n${endereco.complemento}`;
    }
  } else {
    enderecoCompleto = "Endereço não disponível";
  }

  console.log("Endereco Completo: ", enderecoCompleto);

  const listaFormasPagamentos = [
    { label: "Selecione...", value: "" },
    ...formasPagamento.map(formaPgmt =>
      ({ label: formaPgmt, value: formaPgmt })
    ),
  ];

  function fazerPedido(cart, funcaoAdicional = null) {
    axios.post(`${API_URL}/api/pedido`, {
      id_cliente: Number(id) + 1,
      id_empresa: idEmpresa,
      codigoCupom: null,
      dataHora: dataHoraFormatada,
      formaPagamento: selectedPayment,
      statusPagamento: "Aguardando Confirmação",
      statusPedido: "Pendente",
      taxaEntrega: taxaFrete,
      logradouro: getEndereco.logradouro,
      bairro: getEndereco.bairro,
      cidade: getEndereco.cidade,
      estado: getEndereco.estado,
      cep: getEndereco.cep,
      complemento: getEndereco.complemento,
      numeroEndereco: '12',
      itens: montaitens(cart)
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log("Pedido criado com sucesso");
        AsyncStorage.setItem('idPedido', response.data.id.toString());
        if (funcaoAdicional) {
          mercadoPago(cart);
        } else {
          navigation.navigate("PedidoConfirmado", response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function montaitens(cart) {
    var listaItens = []

    cart.forEach(element => {
      let item = {
        id_produto: element.id,
        qtdProduto: element.quantity,
        valorUnitario: element.preco
      }

      listaItens.push(item)
    });

    return listaItens;
  }

  function montaitensMercadoPago(cart) {
    var listaItensMercadoPago = [];
  
    cart.forEach(element => {
      var itemMercadoPago;
  
      if (cupomInfo) {
        itemMercadoPago = {
          title: element.titulo,
          id: element.id,
          quantity: element.quantity,
          unit_price: element.preco * (1 - cupomInfo.percentualDesconto / 100),
          currency_id: 'BRL'
        };
      } else {
        itemMercadoPago = {
          title: element.titulo,
          id: element.id,
          quantity: element.quantity,
          unit_price: element.preco,
          currency_id: 'BRL'
        };
      }
  
      listaItensMercadoPago.push(itemMercadoPago);
    });
  
    return listaItensMercadoPago;
  }

  function formatarDataHora(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
  }

  function formatarMoeda(dataParam) {
    return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  const agora = new Date();
  const dataHoraFormatada = formatarDataHora(agora);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer APP_USR-1980238996971813-112320-8d04c96e13a81ac5d6c8e1a31397f802-1561790253'
  }

  function mercadoPago(cart) {
    const itensM = [];  // Confirme que você precisa dessa variável ou se ela será usada mais tarde

    axios.post('https://api.mercadopago.com/checkout/preferences',
      {
        "items": montaitensMercadoPago(cart),
        "auto_return": "approved",
        "back_urls": {
          "success": "http://localhost:19006/PedidoConfirmado"
        },
        "shipments": {
          "cost": cart[0].categoria.empresa.taxaFrete
        }
      }, 
      { headers: headers }
    )
    .then(function (response) {
        setUrl(response.data.init_point);
        setGo(true);
    })
    .catch(function (error) {
        console.error('Erro ao fazer requisição para o Mercado Pago:', error);
    });
  }

  function primeiraLetraMaiuscula(palavra) {
    palavra = palavra.replace(/[^a-zA-Z0-9 ]/g, ' ');
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  }

  return (
    <View style={styles.container}>
      {go && open(url, "_self")} 
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.navigate("Sacola")} style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>SACOLA</Text>
        <TouchableOpacity>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
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
          {taxaFrete === 0.00 ? 'Grátis' : formatarMoeda(taxaFrete)}
        </Text>
      </View>
  
      <View style={styles.resumo}>
        <Text>Total</Text>
        <Text>{formatarMoeda(valorTotal * (1 - valorDesconto) + taxaFrete)}</Text>
      </View>
  
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>
  
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={styles.subTitleF}>Forma de pagamento</Text>
        <View style={{ marginTop: 10 }}>
          <Picker
            style={styles.input}
            selectedValue={selectedPayment}
            onValueChange={(itemValue) => {
              if (itemValue.toLowerCase() === 'dinheiro') {
                setPagamentoNaEntrega(true);
              } else {
                setPagamentoNaEntrega(false);
              }
              setSelectedPayment(itemValue);
            }}
          >
            {listaFormasPagamentos.map((formaPagamento) => (
              <Picker.Item
                key={formaPagamento.value}
                label={primeiraLetraMaiuscula(formaPagamento.label)}
                value={formaPagamento.value}
              />
            ))}
          </Picker>
        </View>
      </View>
  
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>
  
      <Text style={styles.subTitle}>Confirme a entrega</Text>
  
      <View style={styles.bloco}>
        <Image style={styles.menuIcon} source={require("../assets/images/iconFooter/ic--outline-delivery-dining.png")} />
        <View style={styles.blocoText}>
          <Text style={styles.span}>Entrega Hoje, {cart[0].categoria.empresa.tempoEntrega} min</Text>
        </View>
      </View>
  
      <View style={styles.bloco}>
        <Image style={styles.menuIcon} source={require("../assets/images/iconFooter/material-symbols--location-on-rounded.png")} />
        <Text style={styles.blocoText}>{enderecoCompleto}</Text>
      </View>
  
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>
  
      <View style={styles.footerContainer}>
        <View style={styles.footer2}>
          <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate("Sacola")}>
            <Text>Alterar dados</Text>
          </TouchableOpacity>
        </View>
  
        <Button
          buttonStyle={styles.button}
          title="Fazer pedido"
          onPress={() => {
            if (pagamentoNaEntrega) {
              fazerPedido(cart);
            } else {
              fazerPedido(cart, mercadoPago);
            }
          }}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FF9431",
  },
  title: {
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 18,
  },
  limpar: {
    paddingHorizontal: 20,
    color: "#FF9431", // Alterando para uma cor visível (não branca)
  },
  bloco: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  blocoText: {
    fontSize: 14,  // Ajustando o tamanho da fonte
    color: "#4D585E",  // Cor mais clara para o texto
  },
  subTitle: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 16,  // Tamanho ajustado
    color: "#4D585E",  // Cor ajustada
  },
  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 10, // Ajustando espaçamento
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#F3F3F3",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",  // Garantir que o fundo da footerContainer seja branco
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF9431",
    height: 45,
    width: 300,
    borderRadius: 5,
  },
  subTitleF: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4D585E",
    marginBottom: 10,  // Ajuste para dar mais espaço entre o título e o Picker
  },
  
  input: {
    width: "100%",  // Fazer o seletor ocupar 100% da largura disponível
    height: 50,
    fontSize: 14,
    paddingHorizontal: 10,
    marginVertical: 10, // Ajuste no espaçamento para ficar mais espaçado
    color: "#4D585E",
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: "#FF9431",  // Cor do borda de destaque
  },
  
  selectedPaymentText: {
    fontSize: 14,
    color: "#4D585E",
    marginTop: 5,
  },
  
  footerLink: {
    color: "#FF9431",
    alignSelf: "center",
    fontSize: 16,  // Tamanho de fonte mais adequado
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF9431",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  logoCash: {
    width: 40,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 15,
    tintColor: "#FF9431",
  },
});