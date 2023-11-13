import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";

export default function FormEndereco({ navigation }) {

    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');

    const [selectedUF, setSelectedUF] = useState('');

    const id = 4;

    const local = localStorage.getItem("var");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cliente/${id}`)
            .then(function (response) {
                const data = response.data;
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.cidade);
                setCep(data.cep);
                setEstado(data.estado);
                setComplemento(data.complemento);
            })
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    }, []);

    const inserirDados = () => {
        const userData = {
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            complemento: complemento
        }


        axios.put(`http://localhost:8080/api/cliente/${id}`, userData)
            .then(function (response) {
                console.log(response);
                showMessage({
                    message: "Cadastro de endereço realizado com sucesso!",
                    type: "success"
                });
            })
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    }
    const renderProductList = () => {
        return estados.map((product) => {
            return <Picker.Item label={product.text} value={product.value} />
        })
    }

    return (

        <View style={styles.container}>

            {local == "sacola" ?

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sacola')} style={styles.iconWrapper}>
                        <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                    </TouchableOpacity>

                </View>

                :

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconWrapper}>
                        <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                    </TouchableOpacity>

                </View>
            }

           <Text style={styles.title}>Alterar endereço de entrega</Text>

            <View style={{ alignItems: 'center' }}>

                <View>
                    <Text style={styles.label}>Logradouro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLogradouro(text)}
                        value={logradouro}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setBairro(text)}
                        value={bairro}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setCidade(text)}
                        value={cidade}
                    />
                </View>

                <View>
                    <Text style={styles.label}>UF</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedUF}
                        onValueChange={(itemValue, itemIndex) => setSelectedUF(itemValue)}
                        onChangeText={(text) => setEstado(text)}
                        value={estado}
                    >
                        <Picker.Item label="Selecione..." value="" />
                        <Picker.Item label="PE" value="PE" />
                        <Picker.Item label="PB" value="PB" />
                        <Picker.Item label="BA" value="BA" />
                        <Picker.Item label="RN" value="RN" />
                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setCep(text)}
                        value={cep}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Complemento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setComplemento(text)}
                        value={complemento}
                    />
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Use este endereço"
                    onPress={() => {
                        inserirDados();
                    }}
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
    title:{

        fontSize: 18,
        fontWeight:'bold',
        color:'#FF9431',
        textAlign:'center',
        paddingBottom:20

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