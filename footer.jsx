import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Footer() {

  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      {/*<TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" type="material" color="#FF9431" size={30} iconStyle={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="receipt-outline-rounded" type="material" iconStyle={styles.iconStyle} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
      >
        <Icon name="shopping-bag-outline" type="material"  iconStyle={styles.iconStyle} />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:home-outline.svg', }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:receipt-long-outline-rounded.svg', }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:shopping-bag-outline.svg', }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Menu')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:person-outline.svg', }} />
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  height: 60,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  iconStyle: {
    color: "#FF9431",
    size: 20
  },
  icon: {
    width: 25,
    height: 25,
  },
});
