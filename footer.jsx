import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Footer() {

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home" type="material" color="#FF9431" size={30} iconStyle={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="search" type="material"  iconStyle={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Icon name="receipt" type="material" iconStyle={styles.iconStyle}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Icon name="person" type="material"   iconStyle={styles.iconStyle}/>
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
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  iconStyle: {
    color:"#FF9431",
    size:20
  },
});
