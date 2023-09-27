import axios from 'axios';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            style={styles.topPanelIcon}
            source={{
              uri: 'https://api.iconify.design/material-symbols:top-panel-open-outline-rounded.svg',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={require('/views/img/group5979.png')}
          />
        </View>
        <Text style={styles.title}>Refeições</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000A0F',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#001119',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#ffffff',
  },
  logo: {
    width: '30%',
    height: '75%',
    margin: 80,
  },
  topPanelIcon: {
    width: 20,
    height: 23,
    tintColor: '#ffffff',
  },
  body: {
    flex: 8,
  },
  card: {
    alignItems: 'center',
  },
  cardImage: {
    width: 340,
    height: 130,
    marginTop: 30,
    marginBottom: 50,
  },
  title: {
    color: '#E1E1E6',
    fontSize: 18,
    letterSpacing: 1.5,
    fontWeight: 450,
    marginLeft: 30,
  },
});
