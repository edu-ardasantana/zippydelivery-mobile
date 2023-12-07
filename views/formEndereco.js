import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { TextInputMask } from 'react-native-masked-text';

export default function FormEndereco({ navigation, route }) {

    const { origin }  = route.params;
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [idCliente, setIdCliente] = useState('');

    const [selectedUF, setSelectedUF] = useState('');

    const id = window.localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cliente/findByUser/`+id)
            .then(function (response) {
                const data = response.data;
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.cidade);
                setCep(data.cep);
                setEstado(data.estado);
                setComplemento(data.complemento);
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

    const estados = [
        { label: "Selecione...", value: "" },
        { label: "Acre", value: "AC" },
        { label: "Alagoas", value: "AL" },
        { label: "Amapá", value: "AP" },
        { label: "Amazonas", value: "AM" },
        { label: "Bahia", value: "BA" },
        { label: "Ceará", value: "CE" },
        { label: "Distrito Federal", value: "DF" },
        { label: "Espírito Santo", value: "ES" },
        { label: "Goiás", value: "GO" },
        { label: "Maranhão", value: "MA" },
        { label: "Mato Grosso", value: "MT" },
        { label: "Mato Grosso do Sul", value: "MS" },
        { label: "Minas Gerais", value: "MG" },
        { label: "Pará", value: "PA" },
        { label: "Paraíba", value: "PB" },
        { label: "Paraná", value: "PR" },
        { label: "Pernambuco", value: "PE" },
        { label: "Piauí", value: "PI" },
        { label: "Rio de Janeiro", value: "RJ" },
        { label: "Rio Grande do Norte", value: "RN" },
        { label: "Rio Grande do Sul", value: "RS" },
        { label: "Rondônia", value: "RO" },
        { label: "Roraima", value: "RR" },
        { label: "Santa Catarina", value: "SC" },
        { label: "São Paulo", value: "SP" },
        { label: "Sergipe", value: "SE" },
        { label: "Tocantins", value: "TO" },
    ];


    const inserirDados = () => {
        const userData = {
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            complemento: complemento,
            estado: selectedUF,
        }


        axios.put(`http://localhost:8080/api/cliente/${idCliente}`, userData)
            .then(function (response) {
                console.log(response);
                showMessage({
                    message: "Cadastro de endereço realizado com sucesso!",
                    type: "success"
                });
            })
            .then( () => {
                if (origin === "Sacola" || origin === undefined){
                navigation.navigate('ResumoSacola')
                }else{
                navigation.navigate('Menu')
            }})
            .catch(function (error) {
                console.log(error);
                showMessage({
                    message: `Algo deu errado: ${error}`,
                    type: "danger",
                });
            });
    }

    return (

        <View style={styles.container}>

            {origin === "Sacola" || origin === undefined  ?

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate("Sacola")} style={styles.iconWrapper}>
                        <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                    </TouchableOpacity>

                </View>

                :

                local == "menu" ?

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconWrapper}>
                        <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                    </TouchableOpacity>

                </View>

                : 

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
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
                        {estados.map((estado) => (
                            <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
                        ))}
                    </ Picker>
                </View>

                <View>
                    <Text style={styles.label}>CEP</Text>
                    <TextInputMask
                        style={styles.input}
                        type={'custom'}
                        options={{
                            mask: '99999-999'
                          }}
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
    title: {

        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF9431',
        textAlign: 'center',
        paddingBottom: 20

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
})