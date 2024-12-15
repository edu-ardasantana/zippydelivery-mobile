import axios from 'axios';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import schema from '../schemas/loginSchema'; 

export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logar = async (data) => {
    const credentials = {
      username: data.email,
      password: data.senha,
    };

    axios.post('http://192.168.1.16:8080/api/login', credentials)
      .then(async function (response) {
        try {
          console.log(response.data);

          await AsyncStorage.setItem('id', response.data.id.toString());
          await AsyncStorage.setItem('token', response.data.token);

          navigation.navigate('Home');
        } catch (error) {
          console.error('Erro ao salvar os dados no AsyncStorage', error);
        }
      })
      .catch(function (error) {
        showMessage({
          message: 'Email ou senha inválidos!',
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image style={styles.logo} source={require('../assets/images/LogoNovo.png')} />
        <View>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder='exemplo@email.com'
                placeholderTextColor='#C4C4CC'
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder='No mínimo 6 caracteres'
                placeholderTextColor='#C4C4CC'
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="senha"
          />
          {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}
        </View>

        <Button buttonStyle={styles.button} title="Entrar" onPress={handleSubmit(logar)} />
        <TouchableOpacity onPress={() => navigation.navigate('CadastraUsuario')}>
          <Text style={styles.link}> Criar uma conta</Text>
        </TouchableOpacity>
        <FlashMessage position="top" />
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.googleSignInButton}>
          <Image style={styles.googleIcon} source={require('../assets/images/simbolo-do-google.png')} />
          <Text style={styles.googleButtonText}>Entre com o Google</Text>
        </TouchableOpacity>
        <FlashMessage position="top" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
    height: '30%',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4D585E',
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#dbdbe749',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF9431',
    height: 40,
    width: 300,
    borderRadius: 5,
  },
  link: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbe7',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#4D585E',
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8ecf247',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
    height: 50,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#4D585E',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
});
