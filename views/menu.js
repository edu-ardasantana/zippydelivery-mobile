import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../footer';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={[styles.icon, { marginBottom: 20, marginTop: 20, marginLeft: 20, marginRight: 5 }]}
            source={{
              uri: 'https://api.iconify.design/material-symbols:close-rounded.svg',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.search}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              style={[styles.icon, { marginRight: 10 }]}
              source={{
                uri: 'https://api.iconify.design/material-symbols:search-rounded.svg',
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Busque por pratos ou ingredientes"
          />
        </View>

        <TouchableOpacity style={styles.divider}>
          <Text style={styles.exit}>Sair</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#001119',
    alignItems: 'flex-end',
  },
  body: {
    flex: 5,
    alignItems: 'center',
  },
  title: {
    color: '#E1E1E6',
    fontSize: 17,
    letterSpacing: 1.2,
    fontWeight: '450',
    marginBottom: 23,
    marginTop: 20,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#E1E1E6',
  },
  search: {
    width: '85%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#0D1D25',
    marginTop: 35,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    placeholderTextColor: '#E1E1E6',
  },
  divider: {
    width: '88%',
    borderBottomWidth: 1,
    borderBottomColor: '#192227',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 40,
  },
  exit: {
    color: '#C4C4CC',
    fontSize: 20,
    letterSpacing: 1.2,
    fontWeight: '450',
  },
});
