import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Item from '../item';
import Footer from '../footer';

export default function HomeLoja({ navigation }) {

  const listagemProdutos = [1, 2, 3];
  const listagemEtiquetas = [1, 2, 3, 4, 5, 6];

  const [isFavorite, setIsFavorite] = useState(false);

  function flagFavorite() { setIsFavorite(!isFavorite); }

  const heartImageSource = isFavorite
    ? { uri: 'https://api.iconify.design/material-symbols:favorite-rounded.svg' }
    : { uri: 'https://api.iconify.design/material-symbols:favorite-outline-rounded.svg' };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('/views/img/imgLoja.png')} style={styles.backgroundImage} />
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
              <View style={styles.iconBackground}><Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} /></View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={flagFavorite} style={styles.iconWrapper}>
                <View style={styles.iconBackground}><Image style={styles.icon} source={heartImageSource} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <View style={styles.iconBackground}><Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg' }} /></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.topo}>
            <Text style={[styles.title1, { marginTop: 20 }]}>Nome Restaurante</Text>
          </View>

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

          {listagemProdutos.map((index) => (
            <View key={index}>
              <Text style={styles.title2}>Categoria {index}</Text>
              <TouchableOpacity>
                <Item />
                <Item />
                <Item />
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
  textoEtiqueta: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    padding: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 130,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topo: {
    alignItems: 'center',
  },
  anuncioImage: {
    width: 340,
    height: 130,
    marginTop: 20,
    marginBottom: 35,
  },
  title1: {
    color: '#0D0D0D',
    fontSize: 22,
    letterSpacing: 1.2,
    fontWeight: 'bold',
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
  iconWrapper: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  iconBackground: {
    backgroundColor: 'rgba(25, 34, 39, 0.8)',
    borderRadius: 999,
    padding: 8,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  carousel: {
    marginLeft: 20,
  },
});
