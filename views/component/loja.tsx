
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LojaProps  {
    nome: string;
    categoria: string;
    imgPerfil: string;
    taxaFrete: string;
    tempoEntrega: string;
}

export default function Loja(props: LojaProps) {

    function formatarMoeda(dataParam) {
        return dataParam
            ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '';
    }

    return (
        <View style={styles.slide}>
            <View style={styles.colum1}>
                <Image style={styles.lojaImage} source={{uri:props.imgPerfil}} />
            </View>
            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>{props.nome}</Text>
                <Text style={styles.text}>{props.tempoEntrega}-{props.tempoEntrega + 10} min • {props.categoria} • {formatarMoeda(props.taxaFrete)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 5,
        paddingBottom: 24,
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
    icon: {
        width: 20,
        height: 20,
        tintColor: '#ABABAB',
    },
    text: {
        color: '#7C7C8A',
        fontSize: 12,
        fontWeight: '400',
    },
    lojaImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginVertical: 10,
        marginRight: 7,
    },
    nomeItem: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
});
