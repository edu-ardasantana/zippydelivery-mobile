import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormEndereco({ navigation }) {

    const [descricao, setDescricao] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [selectedUF, setSelectedUF] = useState('');
    const [local, setLocal] = useState('');

    // const id = window.localStorage.getItem("id");

    // const local = localStorage.getItem("var");


    useEffect(() => {
        AsyncStorage.getItem("id").then((id) => {
            if (id) {
                axios.get(`http://192.168.1.16:8080/api/cliente/findByUser/` + id)
                    .then((response) => {
                        const data = response.data;
                        setDescricao(data.descricao);
                        setLogradouro(data.logradouro);
                        setBairro(data.bairro);
                        setCidade(data.cidade);
                        setCep(data.cep);
                        setEstado(data.estado);
                        setComplemento(data.complemento);
                        setIdCliente(data.id);
                    })
                    .catch((error) => {
                        console.log(error);
                        showMessage({
                            message: `Algo deu errado: ${error}`,
                            type: "danger",
                        });
                    });
                    AsyncStorage.getItem("var").then((local) => {
                        if (local) {
                            setLocal(local);
                        
                        }
                    });
            }
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
            descricao: descricao,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            complemento: complemento,
            estado: selectedUF,
        }


        axios.put(`http://192.168.1.16:8080/api/cliente/${idCliente}`, userData)
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

    return (

        <View style={styles.container}>
            {local == "sacola" ?
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sacola')} style={styles.iconWrapper}>
                        <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
                    </TouchableOpacity>
                </View>
                :
                local == "menu" ?
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png')} />
                        </TouchableOpacity>
                    </View>
            }
            <Text style={styles.title}>Alterar endereço de entrega</Text>

            <View style={styles.formContainer}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setDescricao(text)}
                        value={descricao}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Logradouro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setLogradouro(text)}
                        value={logradouro}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setBairro(text)}
                        value={bairro}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setCidade(text)}
                        value={cidade}
                    />
                </View>

                <View style={styles.row}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>UF</Text>
                        <Picker
                            style={styles.input}
                            selectedValue={selectedUF}
                            onValueChange={(itemValue, itemIndex) => setSelectedUF(itemValue)}
                            value={estado}
                        >
                            {estados.map((estado) => (
                                <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputWrapper}>
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
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Complemento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setComplemento(text)}
                        value={complemento}
                    />
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Adicionar Endereço"
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
        backgroundColor: '#fff',
        paddingHorizontal: 20,
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
        paddingVertical: 20,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    inputWrapper: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4D585E',
    },
    input: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: '#dbdbe749',
        borderRadius: 5,
        marginBottom: 10,
        
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FF9431',
        height: 40,
        width: '100%',
        borderRadius: 5,
    },
});