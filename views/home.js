import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../footer';
import Loja from '../loja'

export default function Home({ navigation }) {

  const listagemLojas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const listagemEtiquetas = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>

      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={styles.header} /* onPress={() => navigation.navigate('Menu')} FORM PARA ALTERAR ENDEREÇO*/>
          <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
          <Text style={styles.endereco}>Camaragibe, PE</Text>
          <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:keyboard-arrow-down-rounded.svg', }} />
        </TouchableOpacity>
    </View>

      <ScrollView>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
          {[1, 2].map((index) =>
            <TouchableOpacity key={index} style={styles.banner}>
              <Image style={styles.anuncioImage} source={require(`/views/img/banner${index}.jpg`)} />
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* <View style={styles.containerSearch}>
          <View style={styles.searchFilter}>
            <Image style={[styles.icon, { marginRight: 10, tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:menu-rounded.svg', }} />
          </View>
          <View style={styles.search}>
            <TextInput style={styles.input} placeholder="Busque por pratos ou ingredientes" />
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image style={[styles.icon, { marginRight: 10, tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg', }} />
            </TouchableOpacity>
          </View>
        </View> */}

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
          {listagemEtiquetas.map((index) =>
            index === 1 ? (
              <TouchableOpacity key={index} style={[styles.etiqueta, { backgroundColor: '#FF9431' }]}              >
                <Text style={[styles.textoEtiqueta, { color: 'white' }]}>Etiqueta {index}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.etiqueta}>
                <Text style={styles.textoEtiqueta}>Etiqueta {index}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={styles.title2}>Lojas</Text>
        <View style={styles.cards}>
          {listagemLojas.map((index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeLoja')}>
                <Loja />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>

  );
}

const styles = StyleSheet.create({
  etiqueta: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
    borderColor: '#FF9431',
    borderWidth: 1.4,
    marginLeft: 7,
    marginTop: 20,
  },
  title2: {
    color: '#0D0D0D',
    fontSize: 18,
    letterSpacing: 1.2,
    fontWeight: '450',
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 30,
    fontWeight: '650',
  },
  textoEtiqueta: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    padding: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 25,
    alignItems: 'center',
    height:50
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#FF9431',
    marginVertical: 30,
    marginHorizontal: 5,
  },
  logo: {
    width: '30%',
    height: '75%',
  },
  endereco: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '600',
  },
  anuncioImage: {
    width: 300,
    height: 150,
    marginBottom: 25,
    borderRadius: 10,
    marginRight: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  containerSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  search: {
    width: 280,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderColor: '#CCCCCC',
    borderWidth: 1.4,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    placeholderTextColor: '#7C7C8A',
    color: '#7C7C8A',
  },
  logoLoja: {
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 10,
  },
  infoLoja: {
    flexDirection: 'row',
    marginTop: 7,
  },
  infoLojaTime: {
    color: '#E1E1E6',
    fontSize: 14,
    fontWeight: '350',
  },
  infoLojaStatus: {
    color: '#82F3FF',
    fontSize: 14,
    fontWeight: '450',
  },
  nomeLoja: {
    color: '#E1E1E6',
    fontSize: 14,
    fontWeight: '350',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  carousel: {
    marginLeft: 10,
  },
});
