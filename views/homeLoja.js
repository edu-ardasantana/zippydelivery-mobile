import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../footer'

export default function HomeLoja({ navigation }) {
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
});
