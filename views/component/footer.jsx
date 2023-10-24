import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
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

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Home')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/circum:home.svg', }} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Historico')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/circum:receipt.svg', }} />
        <Text style={styles.text}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Sacola')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/circum:shopping-basket.svg', }} />
        <Text style={styles.text}>Sacola</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Menu')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/circum:user.svg', }} />
        <Text style={styles.text}>Menu</Text>
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
  viewIcon:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconStyle: {
    color: "#FF9431",
    size: 20
  },
  icon: {
    width: 25,
    height: 25,
  },
  text:{
    color: "#FF9431",
    fontSize: 11,
    fontWeight: '500'
  },
});
