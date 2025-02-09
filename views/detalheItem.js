import { useMyContext } from './myContext';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalheItem({ route, navigation }) {

  const [idEmpresa, setIdEmpresa] = useState(null);
  const { produto, origin } = route.params;
  const { addToCart, delToCart, removeFromCart, cart } = useMyContext([]);
  const [selectedQuantity, _setSelectedQuantity] = useState(1);  
  const [showModal, setShowModal] = useState(false);

  const checkCartForCompany = (productId) => {
    const cartItem = cart.find((produto) => produto.id === productId);
    if (cart.length === 0 || (cartItem && cart[0].categoria.empresa.id === idEmpresa)) {
        // Se o carrinho estiver vazio ou se o produto já for da mesma loja, adiciona ao carrinho
        addToCart({ ...produto, quantity: selectedQuantity });
        navigation.navigate('Sacola');
    } else {
        // Se houver produtos de outras lojas no carrinho, exibe o modal
        setShowModal(true);
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

  // Função para adicionar ao carrinho quando o usuário clicar no botão
  const handleAddToCart = () => {
    checkCartForCompany(produto.id);  // Verifica se o produto pode ser adicionado
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
          <TouchableOpacity onPress={() =>  addToCart({ ...produto, quantity: selectedQuantity })} style={styles.button}>
            <Image style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]} source={require("../assets/images/iconFooter/material-symbols--add-rounded.png")} />
          </TouchableOpacity>
          <Button
            style={styles.buttonContainer}
            title={`Adicionar ${formatarMoeda((getProductQuantity(produto.id) * produto.preco))}`}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            onPress={handleAddToCart}  // Chama a função para adicionar ao carrinho
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Já existe um produto de outra loja no carrinho. Deseja ir para o carrinho e finalizar a compra?
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF9431' }]}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('Sacola');
                }}
              >
                <Text style={styles.buttonText}>Ok</Text>
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
                onPress={() => {
                  setShowModal(false);
                }}
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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginTop: 15,
  },
  line4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '70%',
    marginTop: 20,
    backgroundColor: '#FF9431',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#FF9431',
  },
  addButtonTitle: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 80,
    borderWidth: 1,
    padding: 10,
    borderColor: '#E6E6E6',
    borderRadius: 5,
  },
  title1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D0D0D',
  },
  descricao: {
    fontSize: 14,
    color: '#999',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9431',
  },
  title3: {
    fontSize: 16,
    color: '#0D0D0D',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#999',
  },
});
