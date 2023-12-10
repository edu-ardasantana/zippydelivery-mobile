import axios from 'axios';
import { useMyContext } from './myContext';
import { Button } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet, Picker } from "react-native";


export default function ResumoSacola({ navigation }) {

  const userId = parseInt(localStorage.getItem("id"), 10);
  const idEmpresa = window.localStorage.getItem("idEmpresa");

  const { cart, setCart } = useMyContext();

  const calcularTotalCompras = (carrinho) => {
    let total = 0;
    carrinho.forEach((item) => {
      const precoTotalItem = item.preco * item.quantity;
      total += precoTotalItem;
    });
    return total;
  };

  const valorTotal = calcularTotalCompras(cart)
  const taxaFrete = (cart[0].categoria.empresa.taxaFrete === 'Grátis' ? 0.00 : cart[0].categoria.empresa.taxaFrete)
  const isFocused = useIsFocused();

  const color = taxaFrete === 0.00 ? "#39cd39" : "#FF9431";
  const [getEndereco, setEndereco] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/cliente/user/${userId}`)
      .then(function (response) {
        setEndereco(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [isFocused])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/empresa/${idEmpresa}`)
      .then(function (response) {
        setFormasPagamento(response.data.formasPagamento)
        setTaxaFrete(response.data.taxaFrete)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  let enderecoCompleto;
  if (getEndereco.logradouro == null) {
    enderecoCompleto = null;
  } else {
    enderecoCompleto = `${getEndereco.logradouro} - ${getEndereco.bairro}, ${getEndereco.cidade} - ${getEndereco.estado} \n${getEndereco.complemento} `;
  }

  const listaFormasPagamentos = [
    { label: "Selecione...", value: "" },
    ...formasPagamento.map(formaPgmt => ({ label: formaPgmt, value: formaPgmt })),
  ];

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

  function formatarDataHora(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
  }

  const agora = new Date();
  const dataHoraFormatada = formatarDataHora(agora);


  function formatarMoeda(dataParam) {
    return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer APP_USR-1980238996971813-112320-8d04c96e13a81ac5d6c8e1a31397f802-1561790253'
  }
  const [produto, setProduto] = useState();

  function mercadoPago(cart){

    const itensC = montaitens(cart)

    const itensM = []

    itensC.forEach( e => {

      axios.get(`http://localhost:8080/api/produto/${e.id_produto}`).then( async function (response) {
        await setProduto(response.data);
         console.log(produto)
      })

      //console.log(produto)
      let item = {
        title: produto.titulo,
        description: produto.descricao,
        category_id: produto.categoria.descricao,
        quantity: e.qtdProduto,
        currency_id: "BRL",
        unit_price: e.valorUnitario
      }

      itensM.push(item)
    })
    
    console.log(itensM);

    axios.post('https://api.mercadopago.com/checkout/preferences',
    {
      "items": itensM
      // [
      //   {
      //     "title": "Dummy Title",
      //     "description": "Dummy description",
      //     "category_id": "car_electronics",
      //     "quantity": 2,
      //     "currency_id": "BRL",
      //     "unit_price": 1000
      //   }
      // ]
    }, {headers: headers}).then( function (response) {
      console.log(response.data)
    })
  }

  function fazerPedido(cart) {
    axios.post('http://localhost:8080/api/pedido', {
      id_cliente: userId + 1,
      id_empresa: idEmpresa,
      codigoCupom: "",
      dataHora: dataHoraFormatada,
      formaPagamento: selectedPayment,
      statusPedido: "Em Processamento",
      statusPagamento: "Aguardando Confirmação",
      valorTotal: valorTotal,
      taxaEntrega: taxaFrete,
      logradouro: getEndereco.logradouro,
      bairro: getEndereco.bairro,
      cidade: getEndereco.cidade,
      estado: getEndereco.estado,
      cep: getEndereco.cep,
      complemento: getEndereco.complemento,
      numeroEndereco: "12",
      itens: montaitens(cart)
    }
    ).then(function (response) {
      console.log("Pedido realizado com sucesso!")
      navigation.navigate('PedidoConfirmado', response.data.id)
    })
      .catch(function (error) {});
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sacola")}
          style={styles.iconWrapper}
        >
          <Image
            style={styles.icon}
            source={{
              uri: "https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg",
            }}
          />
        </TouchableOpacity>

        <Text style={styles.title}>SACOLA</Text>

        <TouchableOpacity>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Resumo de valores</Text>
      <br />

      <View style={styles.resumo}>
        <Text>Subtotal</Text> <Text>{formatarMoeda(valorTotal)}</Text>
      </View>

      <View style={styles.resumo}>
        <Text>Taxa de entrega</Text>
        <Text style={{ color: `${color}` }}>
          {(() => {
            try {
              return taxaFrete === 0.00 ? `${formatarMoeda(cart[0].categoria.empresa.taxaFrete)}` : ` ${formatarMoeda(cart[0].categoria.empresa.taxaFrete)}`;
            } catch (error) {
              console.error('Erro ao formatar taxaFrete:', error);
              return 'Erro de formatação';
            }
          })()}
        </Text>
      </View>

      <View style={styles.resumo}>
        <Text>
          <strong>Total</strong>
        </Text>{" "}
        <Text>
          <strong>{formatarMoeda((valorTotal + taxaFrete))}</strong>
        </Text>
      </View>
      <br />

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.subTitleF}>Forma de pagamento</Text>
        <View>
          <Picker
            style={styles.input}
            mode="dropdown"
            selectedValue={selectedPayment}
            onValueChange={(itemValue, itemIndex) => setSelectedPayment(itemValue)}
          >
            {listaFormasPagamentos.map((formaPagamento) => (
              <Picker.Item
                key={formaPagamento.value}
                label={(formaPagamento.label.toLowerCase()).charAt(0).toUpperCase() + formaPagamento.label.slice(1)}
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
        <Image
          style={styles.menuIcon}
          source={{
            uri: "https://api.iconify.design/ic:outline-delivery-dining.svg",
          }}
        />

        <Text style={styles.blocoText}>
          <span style={styles.span}>Entrega Hoje</span>
          <br />
          Hoje, {cart[0].categoria.empresa.tempoEntrega} min
        </Text>
      </View>

      <View style={styles.bloco}>
        <Image style={styles.menuIcon} source={{ uri: "https://api.iconify.design/material-symbols:location-on-rounded.svg"}}/>
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
          onPress={() => mercadoPago(cart)}
          //onPress={() => fazerPedido(cart)}
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
    fontSize: 15,
  },
  limpar: {
    paddingHorizontal: 20,
    color: "#FFFFFF",
  },
  bloco: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  blocoText: {
    fontSize: 12,
  },
  subTitle: {
    fontWeight: 500,
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 15,
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
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF9431",
    marginVertical: 20,
    marginHorizontal: 15,
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
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#FF9431",
    height: 30,
    width: 300,
    borderRadius: 5,
  },
  span: {
    fontSize: 13,
  },
  logoCartao: {
    width: 50,
    height: 30,
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
  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  footerLink: {
    color: "#FF9431",
    alignSelf: "center",
  },
  selectedPaymentOption: {
    borderWidth: 2,
    borderColor: "#FF9431",
    borderRadius: 5,
  },
  blocoTouchable: {
    marginVertical: 10,
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  blocoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedPaymentTouchable: {
    borderColor: "#FF9431",
  },
  input: {
    width: 130,
    height: 40,
    fontSize: 13,
    paddingHorizontal: 10,
    marginVertical: 30,
    color: "#4D585E",
    borderColor: 'transparent',
    borderWidth: 1,
    borderBottomColor: "#FF9431"
  },
});