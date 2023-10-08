import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../footer';

export default function Menu({ navigation }) {

  var nomeUser = 'Gabriela Albuquerque';

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.infoNameUser}>{nomeUser},</Text>
          <Text style={styles.infoText}>o que você quer fazer agora?</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FormConta')}>
            <Text style={styles.optionText}>Configuração da conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FormEndereco')}>
            <Text style={styles.optionText}>Endereço de entrega</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Exit')}>
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>


      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    paddingLeft: 30,
  },
  info: {
    marginTop: 80,
    marginBottom: 50,
  },
  title: {
    color: '#E1E1E6',
    fontSize: 17,
    letterSpacing: 1.2,
    fontWeight: '450',
    marginBottom: 23,
    marginTop: 20,
  },
  infoNameUser:{
    color: '#0D0D0D',
    fontSize: 20,
    fontWeight: '600',
  },
  infoText:{
    color: '#FF9431',
    fontSize: 14,
    fontWeight: '500',
  },
  
  options: {
    width: '94%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#b8b8b8',
    marginTop: 40,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    placeholderTextColor: '#7C7C8A',
    color: '#7C7C8A',
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
