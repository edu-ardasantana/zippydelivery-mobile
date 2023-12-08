// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { Button } from 'react-native-elements';
// import { useMyContext } from './myContext';

// export default function ResumoSacola({ navigation }) {

//     const [selectedPayment, setSelectedPayment] = useState(null);
//     const { cart, setCart } = useMyContext();
//     console.log(cart)

//     const calcularTotalCompras = (carrinho) => {
//         let total = 0;

//         carrinho.forEach((item) => {
//           const precoTotalItem = item.preco * item.quantity;
//           total += precoTotalItem;
//         });
      
//         return total;
//       };
    
//     const valorTotal = calcularTotalCompras(cart)

//     return (
//         <View style={styles.container}>

//             <View style={styles.headerContent}>

//                 <TouchableOpacity onPress={() => navigation.navigate('Sacola')} style={styles.iconWrapper}>
//                     <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
//                 </TouchableOpacity>

//                 <Text style={styles.title}>SACOLA</Text>

//                 <TouchableOpacity >
//                     <Text style={styles.limpar}>Limpar</Text>
//                 </TouchableOpacity>

//             </View>

//             <Text style={styles.subTitle}>Resumo de valores</Text><br />

//             <View style={styles.resumo}>
//                 <Text>Subtotal</Text> <Text>R$ {valorTotal.toFixed(2)}</Text>
//             </View>

//             <View style={styles.resumo}>
//                 <Text>Taxa de entrega</Text> <Text>{cart[0].categoria.empresa.taxaFrete}</Text>
//             </View>

//             <View style={styles.resumo}>
//                 <Text><strong>Total</strong></Text> <Text><strong>R$ {(valorTotal+ cart[0].categoria.empresa.taxaFrete).toFixed(2)}</strong></Text>
//             </View><br />

//             <View style={styles.dividerContainer}>
//                 <View style={styles.dividerLine} />
//             </View>

//             <Text style={styles.subTitle}>Escolha a forma de pagamento</Text>

//             <View style={styles.bloco}>
//                 <TouchableOpacity
//                     onPress={() => setSelectedPayment('creditCard')}
//                     style={[styles.blocoTouchable, selectedPayment === 'creditCard' && styles.selectedPaymentTouchable]}
//                 >
//                     <View style={styles.blocoContent}>
//                         <Image style={styles.logoCartao} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/langpt-1500px-Mastercard_2019_logo.svg.png' }} />
//                         <Text style={styles.blocoText}><span style={styles.span}>Crédito</span><br />Mastecard **** 0987</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.bloco}>
                
//                 <TouchableOpacity
//                     onPress={() => setSelectedPayment('cash')}
//                     style={[styles.blocoTouchable, selectedPayment === 'cash' && styles.selectedPaymentTouchable]}
//                 >
//                     <View style={styles.blocoContent}>
//                         <Image style={styles.logoCash} source={{ uri: 'https://api.iconify.design/iconoir:lot-of-cash.svg' }} />
//                         <Text style={styles.blocoText}><span style={styles.span}>Pagar na entrega</span></Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.dividerContainer}>
//                 <View style={styles.dividerLine} />
//             </View>

//             <Text style={styles.subTitle}>Confirme a entrega</Text>

//             <View style={styles.bloco}>

//                 <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/ic:outline-delivery-dining.svg', }} />

//                 <Text style={styles.blocoText}><span style={styles.span}>Entrega Hoje</span><br />Hoje, {cart[0].categoria.empresa.tempoEntrega}min
//                 </Text>

//             </View>

//             <View style={styles.bloco}>
//                 <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />

//                 <Text style={styles.blocoText}>Avenida do príncipe mimado, 267<br />Caxangá - Condomínio das flores bloco 02 apto 505
//                 </Text>

//             </View>

//             <View style={styles.dividerContainer}>
//                 <View style={styles.dividerLine} />
//             </View>

//             <View style={styles.footerContainer}>

//                 <View style={styles.footer2}>

//                     <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('Sacola')}>
//                         <Text>Alterar dados</Text>
//                     </TouchableOpacity>

//                 </View>

//                 <Button
//                     buttonStyle={styles.button}
//                     title="Fazer pedido"
//                     onPress={() => navigation.navigate('ConfirmaPedido')}
//                 />

//             </View>

//         </View>
//     )

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//     },
//     headerContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     iconWrapper: {
//         paddingVertical: 20,
//         paddingHorizontal: 10,
//     },
//     icon: {
//         width: 20,
//         height: 20,
//         tintColor: '#FF9431',
//     },
//     title: {
//         paddingLeft: 15,
//         fontWeight: 'bold',
//         fontSize: 15,
//     },
//     limpar: {
//         paddingHorizontal: 20,
//         color: '#FF9431'
//     },
//     bloco: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 20
//     },
//     blocoText: {
//         fontSize: 10
//     },
//     subTitle: {
//         fontWeight: 'bold',
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         fontSize: 15,
//     },
//     dividerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     dividerLine: {
//         flex: 1,
//         height: 1,
//         backgroundColor: '#dbdbe7',
//     },
//     menuIcon: {
//         width: 20,
//         height: 20,
//         tintColor: '#FF9431',
//         marginVertical: 20,
//         marginHorizontal: 15,
//     },
//     footerContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         paddingVertical: 20,
//         paddingHorizontal: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 1,
//         shadowRadius: 3,
//         elevation: 5,
//     },
//     button: {
//         alignSelf: 'center',
//         marginTop: 20,
//         backgroundColor: '#FF9431',
//         height: 30,
//         width: 300,
//         borderRadius: 5
//     },
//     span: {
//         fontSize: 13
//     },
//     logoCartao: {
//         width: 50,
//         height: 30,
//         marginVertical: 20,
//         marginHorizontal: 15,
//     },
//     logoCash: {
//         width: 40,
//         height: 40,
//         marginVertical: 20,
//         marginHorizontal: 15,
//         tintColor: '#FF9431',
//     },
//     resumo: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 40,

//     },
//     footerLink: {
//         color: '#FF9431',
//         alignSelf: 'center'
//     },
//     selectedPaymentOption: {
//         borderWidth: 2,
//         borderColor: '#FF9431',
//         borderRadius: 5,
//     },
//     blocoTouchable: {
//         marginVertical:10,
//         width: '100%',
//         height: 70,
//         borderWidth: 1, 
//         borderColor: '#ddd',
//         borderRadius: 5,
//         padding: 10, 
//         justifyContent:'center'
//     },
//     blocoContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     selectedPaymentTouchable: {
//         borderColor: '#FF9431',
//     },

// });

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Picker } from "react-native";
import { Button } from "react-native-elements";
import { useIsFocused } from '@react-navigation/native';
import { useMyContext } from './myContext';

export default function ResumoSacola({ navigation }) {
  
  // const id = window.localStorage.getItem("id");  
  // const idEmpresa = window.localStorage.getItem("idEmpresa");
  const userId = parseInt(localStorage.getItem('id'));
  const { cart, setCart } = useMyContext();
  console.log(cart)

  const calcularTotalCompras = (carrinho) => {
    let total = 0;

    carrinho.forEach((item) => {
      const precoTotalItem = item.preco * item.quantity;
      total += precoTotalItem;
    });
      
    return total;
  };
    
  const valorTotal = calcularTotalCompras(cart)
  const taxaFrete = (cart[0].categoria.empresa.taxaFrete === 'Grátis' ? 0.00 : cart[0].categoria.empresa.taxaFrete.toFixed(2))
  const isFocused = useIsFocused();
  console.log(isFocused)
  
  const color = taxaFrete === 0.00 ? "#39cd39" : "#FF9431";
  const [getEndereco, setEndereco] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/empresa/${idEmpresa}`)
  //     .then(function (response) {
  //       setFormasPagamento(response.data.formasPagamento)
  //       setTaxaFrete(response.data.taxaFrete)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cliente/${userId + 1}`)
      .then(function (response) {
        setEndereco(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [isFocused])

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
        <Text>Subtotal</Text> <Text>R$ {valorTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.resumo}>
        <Text>Taxa de entrega</Text>
        <Text style={{ color: `${color}` }}>
          {(() => {
            try {
              return taxaFrete === 0.00 ? `${cart[0].categoria.empresa.taxaFrete.toFixed(2)}` : `R$ ${cart[0].categoria.empresa.taxaFrete.toFixed(2)}`;
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
          <strong>R$ {parseFloat(valorTotal + parseFloat(taxaFrete)).toFixed(2)}</strong>
        </Text>
      </View>
      <br />

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <Text style={styles.subTitle}>Escolha a forma de pagamento</Text>
      <View style={{ alignItems: 'center' }}>

        <View>
          <Picker
            style={styles.input}
            selectedValue={selectedPayment}
            onValueChange={(itemValue, itemIndex) => setSelectedPayment(itemValue)}
          >
            {listaFormasPagamentos.map((formaPagamento) => (
              <Picker.Item
                key={formaPagamento.value}
                label={formaPagamento.label}
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
        <Image
          style={styles.menuIcon}
          source={{
            uri: "https://api.iconify.design/material-symbols:location-on-rounded.svg",
          }}
        />

        <Text style={styles.blocoText}>
          {enderecoCompleto}
        </Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footer2}>
          <TouchableOpacity
            style={styles.footerLink}
            onPress={() => navigation.navigate("Sacola")}
          >
            <Text>Alterar dados</Text>
          </TouchableOpacity>
        </View>

        <Button
          buttonStyle={styles.button}
          title="Fazer pedido"
          onPress={() => navigation.navigate("ConfirmaPedido")}
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
    fontSize: 10,
  },
  subTitle: {
    fontWeight: "bold",
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
    backgroundColor: "#dbdbe7",
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
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#dbdbe749',
    marginVertical: 30,
    borderRadius: 5,

  },
});