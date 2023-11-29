import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LojaProps {
    nome: string;
    categoria: string;
    imgPerfil: string;
    taxaFrete: string;
}

export default function Loja(props: LojaProps) {

    function formatarMoeda(dataParam: number | string) {
        return dataParam
            ? Number(dataParam).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
            : '';
    }

    return (
        <View style={styles.slide}>
            <View style={styles.colum1}>
                <Image style={styles.lojaImage} source={{ uri: `${props.imgPerfil}` }} />
            </View>
            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>{props.nome}</Text>
                <Text style={styles.text}>{props.categoria}</Text>
                <Text style={styles.text}>{formatarMoeda(props.taxaFrete)}</Text>
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
        borderBottomColor: '#BBB',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    colum1: {
        flex: 1.2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
    },
    colum2: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
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
    },
    nomeItem: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
});
