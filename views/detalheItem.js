import { useMyContext } from './myContext';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalheItem({ route, navigation }) {
  const [idEmpresa, setIdEmpresa] = useState(null);
  const { produto } = route.params;
  const { addToCart, delToCart, cart, clearCart } = useMyContext();

  const [selectedQuantity, _setSelectedQuantity] = useState(1);  
  const [showModal, setShowModal] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false); 
  const checkCartForCompany = (productId) => {
    if (cart.length === 0) {
      addToCart({ ...produto, quantity: selectedQuantity });
      navigation.navigate('Sacola');
      return;
    }

    const hasOtherCompanyProduct = cart.some((item) => item.categoria.empresa.id !== produto.categoria.empresa.id);

    if (hasOtherCompanyProduct) {
      setIsReplacing(true);  
      setShowModal(true); 
    } else {
      addToCart({ ...produto, quantity: selectedQuantity });
      navigation.navigate('Sacola');
    }
  };

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((produto) => produto.id === productId);
    return cartItem ? cartItem.quantity : 0;  
  };

  useEffect(() => {
    const fetchIdEmpresa = async () => {
      const storedIdEmpresa = await AsyncStorage.getItem('idEmpresa');
      setIdEmpresa(storedIdEmpresa);
    };
    fetchIdEmpresa();
  }, []);

  function formatarMoeda(dataParam) {
    return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  const handleAddToCart = () => {
    checkCartForCompany(produto.id);  
  };

  const handleReplaceCart = () => {
    clearCart();  
    addToCart({ ...produto, quantity: selectedQuantity }); 
    setShowModal(false);  
    navigation.navigate('Sacola');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri:produto.imagem}}
          style={styles.backgroundImage}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeLoja',{id: idEmpresa})} style={styles.iconWrapper}>
            <View style={styles.iconBackground}>
              <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent1}>
          <Text style={[styles.title1, { marginTop: 30 }]}>{produto.titulo}</Text>
          <Text style={styles.descricao}>{produto.descricao} • 
            <Text style={[styles.title2, { color: '#FF9431' }]}> {formatarMoeda(produto.preco)}</Text>
          </Text>
        </View>

        <View style={styles.bodyContent2}>
          <View style={styles.box}>
            <Image style={styles.iconP} source={require('../assets/images/iconFooter/material-symbols--restaurant.png')} />
            <Text style={styles.title3}>{produto.categoria.empresa.nome}</Text>
          </View>
          <Text style={styles.text}>Tempo de entrega: {produto.categoria.empresa.tempoEntrega} min • {produto.categoria.descricao} • <Text style={{ color: '#FF9431' }}><Text style={styles.text}>Frete:</Text>{formatarMoeda(produto.categoria.empresa.taxaFrete)}</Text></Text>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.bodyContent3}>
          <View style={styles.headerBodyContent3}>
            <Image style={[styles.iconP, { tintColor: '#4D585E' }]} source={require('../assets/images/iconFooter/flowbite--edit-outline.png')} />
            <Text style={[styles.title3, { color: '#4D585E' }]}>Alguma observação?</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex: tirar cebola, maionese à parte, ponto de carne etc"
            placeholderTextColor="#999"
            multiline={true}
          />
        </View>

        <View style={[styles.line4, { marginTop: 10 }]}>
          <TouchableOpacity onPress={() => delToCart({ ...produto, quantity: selectedQuantity })} style={styles.button}>
            <Image style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]} source={require("../assets/images/iconFooter/material-symbols--remove-rounded.png")} />
          </TouchableOpacity>
          <Text style={[styles.title2, { color: '#FF9431', marginVertical: 20 }]}>{getProductQuantity(produto.id)}</Text>
          <TouchableOpacity onPress={() => addToCart({ ...produto, quantity: selectedQuantity })} style={styles.button}>
            <Image style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]} source={require("../assets/images/iconFooter/material-symbols--add-rounded.png")} />
          </TouchableOpacity>
          <Button
            style={styles.buttonContainer}
            title={`Adicionar ${formatarMoeda((getProductQuantity(produto.id) * produto.preco))}`}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            onPress={handleAddToCart} 
          />
        </View>
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={showModal}
  onRequestClose={() => setShowModal(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>
        Já existe um produto de outra loja no carrinho. Deseja substituir o item atual e finalizar a compra?
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF9431' }]}
          onPress={handleReplaceCart}
        >
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: 'white',
              borderColor: '#FF9431',
              borderWidth: 1,
              marginLeft: 10
            }
          ]}
          onPress={() => setShowModal(false)}
        >
          <Text style={[styles.buttonText, { color: '#FF9431' }]}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FF9431',
  },
  iconP: {
    width: 15,
    height: 15,
    tintColor: '#0D0D0D',
  },
  iconBackground: {
    backgroundColor: 'rgba(255, 250, 241, 0.9)',
    borderRadius: 999,
    padding: 5,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContent1: {
    paddingHorizontal: 40,
  },
  bodyContent2: {
    height: 70,
    width: '90%',
    borderRadius: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1.4,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingTop: 10,
    marginTop: 20,
  },
  bodyContent3: {
    height: 100,
    width: '90%',
    marginVertical: 20,
  },
  headerBodyContent3: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 7,
  },
  box: {
    height: '40%',
    width: '90%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    margin: 20,
  },
  title1: {
    color: '#0D0D0D',
    fontSize: 22,
    letterSpacing: 1.2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    color: '#FF9431',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title3: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  descricao: {
    color: '#7C7C8A',
    fontSize: 16,
    fontWeight: '400',
  },
  text: {
    color: '#7C7C8A',
    fontSize: 12,
    fontWeight: '400',
    padding: 10,
    letterSpacing: 1.2,
  },
  input: {
    height: 120,
    paddingHorizontal: 10,
    placeholderTextColor: '#ABABAB',
    color: '#ABABAB',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 5,
  },
  line4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 40,
    width: '90%', 
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  addButton: {
    backgroundColor: '#FF9431',
    width: 140, 
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
  },
  addButtonTitle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', 
    elevation: 10,
  },
  modalText: {
    color: '#0D0D0D',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});