import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';


export default function FormConta({ navigation }) {
    const route = useRoute();
    const { cliente } = route.params || {};
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const id = 1
  
    useEffect(() => {
      axios.get(`http://localhost:8080/api/cliente/${id}`)
        .then(function (response) {
          const data = response.data;
          setNome(data.nome);
          setEmail(data.email);
          setSenha(data.senha);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []); 
  
  const alterarDados = () => {

    
    axios
      .put(`http://localhost:8080/api/cliente/${id}`, {
        
        nome: nome,
        email: email,
        senha: senha,
      })
      
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const excluirDados = () => {

    axios.delete(`http://localhost:8080/api/cliente/${id}`)
    
    .then(function (response) {
    console.log(response);
    }).catch(function (error) {
    console.log(error);
    
    });
    
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginBottom: 40 }}>
                    <Input style={{ paddingLeft: 20 }}
                        placeholder='Gabriela Albuquerque'
                        leftIcon={<Image style={styles.icon} source={{ uri: 'https://api.iconify.design/grommet-icons:edit.svg' }} />}
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='gabi_102@gmail.com'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Senha atual</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='******'
                        secureTextEntry={true}
                        onChangeText={(text) => setSenha(text)}
                        value={senha}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Nova Senha <Text style={{ fontSize: 11 }}>(Opcional)</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder='No mínimo 6 caracteres'
                        secureTextEntry={true}
                    />
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Atualizar dados"
                    onPress={() => {
                        alterarDados();
                        navigation.navigate('ConfirmaAlteracao')}}
                />
                <Button
                    buttonStyle={styles.button}
                    title="Excluir conta"
                    onPress={()=> excluirDados()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#FF9431',
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center',
        height: 50
    },
    menuIcon: {
        width: 25,
        height: 25,
        tintColor: '#FF9431',
        marginVertical: 30,
        marginHorizontal: 5,
    },
    endereco: {
        color: '#0D0D0D',
        fontSize: 17,
        fontWeight: '600',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4D585E'
    },
    input: {
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        color: '#C4C4CC',
        backgroundColor: '#dbdbe749',
        marginBottom: 10,
        borderRadius: 5,

    },
    button: {
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 40,
        width: 300,
        borderRadius: 5
    },
})