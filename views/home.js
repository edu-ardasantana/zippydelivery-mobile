import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../footer'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.menuIcon}
            source={{
              uri: 'https://api.iconify.design/material-symbols:menu-rounded.svg',
            }}
          />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require('/views/img/logo2.png')}
        />

        <TouchableOpacity>
          <Image
            style={styles.menuIcon}
            source={{
              uri: 'https://api.iconify.design/material-symbols:top-panel-open-outline-rounded.svg',
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.anuncio}>
          <Image
            style={styles.anuncioImage}
            source={require('/views/img/group5979.png')}
          />
        </View>
        <Text style={styles.title}>Restaurantes</Text>

        <View style={styles.cards}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <View>
                <Image
                  style={styles.logoLoja}
                  source={require('/views/img/logoLoja.png')}
                />
              </View>
              <View>
                <Text style={styles.nomeLoja}>Boi e Brasa Spettus</Text>
                <View style={styles.infoLoja}>
                  <Text style={styles.infoLojaTime}>70 min        </Text>
                  <Text style={styles.infoLojaStatus}>Aberto</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000A0F',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#001119',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#ffffff',
    margin: 20,
  },
  logo: {
    width: '30%',
    height: '75%',
  },
  body: {
    flex: 1,
  },
  title: {
    color: '#E1E1E6',
    fontSize: 18,
    letterSpacing: 1.5,
    fontWeight: '450',
    marginLeft: 30,
    marginBottom: 20,
  },
  anuncio: {
    alignItems: 'center',
  },
  anuncioImage: {
    width: 340,
    height: 130,
    marginTop: 30,
    marginBottom: 50,
  },
  cards: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    width: '85%',
    backgroundColor: '#00070A',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 7,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
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
});
