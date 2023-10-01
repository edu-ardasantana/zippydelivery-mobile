import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Slide from '../slide';

export default function HomeLoja({ navigation }) {
  const carrosseis = [1, 2, 3];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
          </TouchableOpacity>

          <Image style={styles.logo} source={require('/views/img/logo2.png')} />

          <TouchableOpacity>
            <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg' }} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.anuncio}>
            <Image style={styles.anuncioImage} source={require('/views/img/group5979.png')} />
          </View>

          <View style={styles.anuncio}>
            <Text style={[styles.title1, { marginBottom: 15 }]}>Nome Restaurante</Text>
          </View>

          {carrosseis.map((index) => (
            <TouchableOpacity key={index}>
              <Text style={styles.title2}>Categoria {index}</Text>
              <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
                <Slide />
                <Slide />
                <Slide />
              </ScrollView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000A0F',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#001119',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '30%',
    height: '75%',
  },
  anuncio: {
    alignItems: 'center',
  },
  anuncioImage: {
    width: 340,
    height: 130,
    marginTop: 20,
    marginBottom: 35,
  },
  title1: {
    color: '#E1E1E6',
    fontSize: 22,
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  title2: {
    color: '#E1E1E6',
    fontSize: 17,
    letterSpacing: 1.2,
    fontWeight: '450',
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 15,
  },
  icon: {
    tintColor: '#E1E1E6',
    width: 25,
    height: 25,
    margin: 20,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carousel: {
    marginLeft: 20,
  },
});
