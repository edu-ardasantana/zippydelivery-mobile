import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from './component/footer';

export default function Menu({ navigation }) {

  const [user, setUser] = useState("");
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cliente/${userId+1}`)
      .then(function (response) {
        const data = response.data;
        setUser(data);

      })
      .catch(function (error) {
        console.log(error);
        console.log(error)
      });
  }, []);


  // var nomeUser = nome;
  // localStorage.setItem("var", "menu");

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.infoNameUser}>{user.nome},</Text>
          <Text style={styles.infoText}>o que você quer fazer agora?</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FormConta')}>
            <Text style={styles.optionText}>Configuração da conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FormEndereco', {origin:'Menu'})}>
            <Text style={styles.optionText}>Endereço de entrega</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.optionText}>Voltar</Text>
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
    backgroundColor: '#fff'
  },
  body: {
    flex: 1,
    paddingLeft: 30,
  },
  info: {
    marginTop: 80,
    marginBottom: 50,
  },
  infoNameUser: {
    color: '#0D0D0D',
    fontSize: 20,
    fontWeight: '600',
  },
  infoText: {
    color: '#FF9431',
    fontSize: 14,
    fontWeight: '500',
  },
  options: {
    width: '94%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  option: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4CC',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4D585E',
    paddingLeft: 5,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FF9431',
},
  iconWrapper: {
    paddingVertical: 10,
  },
});
