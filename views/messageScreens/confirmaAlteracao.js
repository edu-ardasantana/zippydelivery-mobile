import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Footer from '../../components/footer';
import FooterEntregador from '../../components/footerEntregador';
import { API_URL } from '../../components/linkApi';

export default function ConfirmaAlteracao({ navigation }) {
    const [entregadorLogado, setEntregadorLogado] = useState(false);

    useEffect(() => {
        const verificarEntregador = async () => {
            try {
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');

                if (userId && token) {
                    const response = await axios.get(`${API_URL}/api/entregador/usuario/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.data) {
                        setEntregadorLogado(true);
                    }
                }
            } catch (error) {
                console.log('Erro ao verificar entregador:', error);
            }
        };

        verificarEntregador();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <Image style={styles.iconMessage} source={require('../../assets/images/successUpdateIcon.png')} />
                <Text style={styles.title1}>Sucesso</Text>
                <Text style={styles.title2}>Seus dados foram alterados</Text>
            </View>

            {entregadorLogado ? <FooterEntregador /> : <Footer />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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
    iconMessage: {
        width: 180,
        height: 170,
        marginBottom: 70,
        marginTop: 80,
    },
    title1: {
        color: '#FF9431',
        fontSize: 18,
        letterSpacing: 1.2,
        fontWeight: 'bold',
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 15,
        marginTop: 5,
    },
});
