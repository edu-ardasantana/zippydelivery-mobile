import axios from "axios";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { TextInputMask } from "react-native-masked-text";
import { CheckBox } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schemas/registerSchema";

export default function CadastraUsuario({ navigation }) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isEntregador, setIsEntregador] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

    const inserirDados = async () => {
        const userData = {
            nome,
            cpf,
            email,
            senha,
            entregador,
        };

        try {
            const response = await axios.post('http://192.168.1.16:8080/api/cliente', userData);
            console.log("Resposta da API: ", response);

            // Define a mensagem de sucesso
            setSuccessMessage("Cadastro realizado com sucesso!");
            setErrorMessage(''); // Limpa qualquer mensagem de erro

            // Redireciona para a tela de login após 2 segundos
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error);

            // Define a mensagem de erro
            setErrorMessage("Algo deu errado. Por favor, tente novamente.");
            setSuccessMessage(''); // Limpa qualquer mensagem de sucesso
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/LogoNovo.png')} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Nome</Text>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Maria da Silva"
                            placeholderTextColor="#C4C4CC"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}


                <Text style={styles.label}>CPF</Text>
                <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { onChange, value } }) => (
                        <TextInputMask
                            style={styles.input}
                            type={"cpf"}
                            placeholder="000.000.000-00"
                            placeholderTextColor="#C4C4CC"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}


                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="maria@email.com"
                            placeholderTextColor="#C4C4CC"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}


                <Text style={styles.label}>Senha</Text>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="No mínimo 6 caracteres"
                            placeholderTextColor="#C4C4CC"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        checked={isEntregador}
                        onPress={() => setIsEntregador(!isEntregador)}
                        containerStyle={styles.checkbox}
                        uncheckedColor="#FF9431"
                        checkedColor="#FF9431"
                    />
                    <Text style={styles.checkboxText}>Quero ser entregador</Text>
                </View>

                <Button
                    buttonStyle={styles.button}
                    title="Criar conta"
                    onPress={handleSubmit(inserirDados)}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>

                    <Text style={styles.link}> Já tenho uma conta</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.googleSignIn}>
                <TouchableOpacity style={styles.googleSignInButton}>
                    <Image
                        style={styles.googleIcon}
                        source={require('../assets/images/simbolo-do-google.png')}
                    />
                    <Text style={styles.googleButtonText}>Entre com o Google</Text>
                </TouchableOpacity>
            </View>

            <FlashMessage position="top" />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '70%',
        height: 120,
        resizeMode: 'contain',
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: "#4D585E",
    },
    input: {
        height: 48,
        paddingHorizontal: 10,
        backgroundColor: "#dbdbe749",
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: "#FF9431",
        height: 40,
        borderRadius: 5,
    },
    link: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 30,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 4,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#dbdbe7",
    },
    dividerText: {
        marginHorizontal: 10,
        color: "#4D585E",
    },
    googleSignIn: {
        alignItems: 'center',
        marginBottom: 30,
    },
    googleSignInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e8ecf2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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
    checkboxContainer: {
        width: 350,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    checkbox: {
        marginRight: 0,
    },
    checkboxText: {
        fontSize: 16,
        color: "#4D585E",
    },
});
