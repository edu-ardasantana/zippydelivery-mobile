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
        <Image style={[styles.icon, { tintColor: '#FF9431', }]}  source={require('../assets/images/iconFooter/circum--home.png')} /> 
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Historico')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={require('../assets/images/iconFooter/circum--receipt.png')} />
        <Text style={styles.text}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Sacola')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={require('../assets/images/iconFooter/circum--shopping-basket.png')} />
        <Text style={styles.text}>Sacola</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.navigate('Menu')}>
        <Image style={[styles.icon, { tintColor: '#FF9431', }]} source={require('../assets/images/iconFooter/circum--user.png')} />
        <Text style={styles.text}>Menu</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "white",
    //margin: 0,
    //width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor:'#FF9431',
    paddingVertical: 10,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0,
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
