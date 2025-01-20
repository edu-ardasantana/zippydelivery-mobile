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
    // O produto já será adicionado assim que o componente for montado.
    addToCart({ ...produto, quantity: selectedQuantity });
}, []);  // O efeito deve rodar quando a quantidade mudar.


  useEffect(() => {
    const fetchIdEmpresa = async () => {
      const storedIdEmpresa = await AsyncStorage.getItem('idEmpresa');
      setIdEmpresa(storedIdEmpresa);
    };
    fetchIdEmpresa();
    
  }, [])

  function formatarMoeda(dataParam) {
    return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={produto.imagem}
          style={styles.backgroundImage}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeLoja',{id: idEmpresa})} style={styles.iconWrapper}>
            <View style={styles.iconBackground}>
              <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
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
            <Image style={styles.iconP} source={{ uri: 'https://api.iconify.design/material-symbols:restaurant.svg' }} />
            <Text style={styles.title3}>{produto.categoria.empresa.nome}</Text>
          </View>
          <Text style={styles.text}>Tempo de entrega: {produto.categoria.empresa.tempoEntrega} min • {produto.categoria.descricao} • <Text style={{ color: '#FF9431' }}><Text style={styles.text}>Frete:</Text>{formatarMoeda(produto.categoria.empresa.taxaFrete)}</Text></Text>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.bodyContent3}>
          <View style={styles.headerBodyContent3}>
            <Image style={[styles.iconP, { tintColor: '#4D585E' }]} source={{ uri: 'https://api.iconify.design/material-symbols:edit-outline-sharp.svg' }} />
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
          <TouchableOpacity onPress={()=>delToCart({...produto, quantity: selectedQuantity })} style={styles.button}>
            <Image style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]} source={{ uri: 'https://api.iconify.design/material-symbols:remove-rounded.svg' }} />
          </TouchableOpacity>
          <Text style={[styles.title2, { color: '#FF9431', marginVertical: 20 }]}>{getProductQuantity(produto.id)}</Text>
          <TouchableOpacity
    onPress={() => {
        addToCart({ ...produto, quantity: selectedQuantity });
        checkCartForCompany(produto.id);  // Verifica se o produto de outra loja está no carrinho.
    }}
    style={styles.buttonContainer}
>
    <Button
        title={`Adicionar ${formatarMoeda(selectedQuantity * produto.preco)}`}
        buttonStyle={styles.addButton}
        titleStyle={styles.addButtonTitle}
    />
</TouchableOpacity>

          <Button
            style={styles.buttonContainer}
            title={`Adicionar ${formatarMoeda((getProductQuantity(produto.id)*produto.preco))}`}
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            onPress={() => checkCartForCompany(produto.id)}            
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
                navigation.navigate('Sacola')
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
                  borderWidth: 1, // Adiciona uma largura para a borda
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
    width: '90%', // Ajusta largura para centralizar os itens no conteúdo
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  addButton: {
    backgroundColor: '#FF9431',
    width: 140, // Ajuste de largura
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

});
