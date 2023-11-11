import { type } from 'os';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LojaProps {
    nome: string;
    categoria: string;
    imagem: string;
    taxaFrete: string;
    tempoEntrega: any;
};


export default function Loja(props: LojaProps, { navigation }) {
    /*const tempoMin = 40;
    const tempoMax = 50;
    const categoria = 'Bebidas';
    const frete = formatarMoeda(6.99);


    function formatarMoeda(dataParam) {
        return dataParam
            ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '';
    }*/

    return (
            <View style={styles.slide}>

                <View style={styles.colum1}>
                    <Image style={styles.lojaImage} source={{ uri: props.imagem }} />
                </View>

                <View style={styles.colum2}>
                    <Text style={styles.nomeItem}>{props.nome}</Text>
                    <Text style={styles.text}>{props.tempoEntrega}-{props.tempoEntrega+10} min • {props.categoria} • R${props.taxaFrete}</Text>
                </View>

            </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 5,
        paddingBottom: 24,
        height: '70%',
    },
    colum1: {
        flex: 1.2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
    },
    colum2: {
        flex: 2.5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    colum3: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    iconWrapper: {
        padding: 10,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#ABABAB',
    },
    text: {
        color: '#7C7C8A',
        fontSize: 16,
        fontWeight: '400',
    },
    lojaImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginVertical: 10,
        marginRight: 7,
    },
    nomeItem: {
        color: '#0D0D0D',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 2,
    },
});
