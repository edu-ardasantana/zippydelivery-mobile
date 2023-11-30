import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, Modal, Pressable } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export default function FormConta({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const route = useRoute();
    const { cliente } = route.params || {};

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idCliente, setIdCliente] = useState('');

    const id = window.localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cliente/findByUser/`+id)
            .then(function (response) {
                const data = response.data;
                setNome(data.nome);
                setEmail(data.email);
                setSenha(data.senha);
                setIdCliente(data.id);

            })
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    }, []);

    const alterarDados = () => {


        axios
            .put(`http://localhost:8080/api/cliente/`+idCliente, {

                nome: nome,
                email: email,
                senha: senha,
            })

            .then(function (response) {
                console.log(response);
                showMessage({
                    message: "Alteração realizada com sucesso!",
                    type: "success"
                });
                navigation.navigate('ConfirmaAlteracao')
            })
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    };

    const excluirDados = () => {

        axios.delete(`http://localhost:8080/api/cliente/`+idCliente)

            .then(function (response) {
                console.log(response);
                navigation.navigate('Login');
            }).catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });

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
                        leftIcon={<Image style={styles.icon} source={{ uri: 'https://api.iconify.design/grommet-icons:edit.svg' }} />}
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Nova Senha <Text style={{ fontSize: 11 }}>(Opcional)</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder='No mínimo 6 caracteres'
                        placeholderTextColor='#C4C4CC'
                        secureTextEntry={true}
                    />
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Atualizar dados"
                    onPress={() => {
                        alterarDados();
                    }}
                />

                <View style={styles.centeredView}>
                    <Modal animationType="slide" transparent={true} visible={modalVisible}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Tem certeza que deseja excluir sua conta?</Text>

                                <View style={styles.buttonGroup}>
                                    <Pressable
                                        style={[styles.buttonModal, styles.buttonCancel]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Cancelar</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.buttonModal, styles.buttonDelete]}
                                        onPress={() => {
                                            excluirDados();
                                        }}>
                                        <Text style={styles.textStyle}>Excluir</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Button
                        buttonStyle={[styles.buttonModal, styles.buttonOpen]}
                        title="Excluir conta"
                        onPress={() => {
                            setModalVisible(true)
                        }}
                    />


                </View>

                <FlashMessage position="top" />

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#FF9431',
        height: 40,
        width: 300,
        borderRadius: 5,
    },
    buttonCancel: {
        backgroundColor: '#FF9431',
        height: 40,
        width: 90,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonDelete: {
        backgroundColor: 'red',
        height: 40,
        width: 90,
        borderRadius: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 400
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 20,
    },
})