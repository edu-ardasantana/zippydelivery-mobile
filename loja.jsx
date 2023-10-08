import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Loja({ navigation }) {
    const tempoMin = 40;
    const tempoMax = 50;
    const categoria = 'Bebidas';
    const frete = formatarMoeda(6.99);

    const [isFavorite, setIsFavorite] = useState(false);

    function flagFavorite() {
        setIsFavorite(!isFavorite);
    }

    const heartImageSource = isFavorite
        ? { uri: 'https://api.iconify.design/material-symbols:favorite-rounded.svg' }
        : { uri: 'https://api.iconify.design/material-symbols:favorite-outline-rounded.svg' };

    function formatarMoeda(dataParam) {
        return dataParam
            ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '';
    }

    return (
        <View style={styles.slide}>

            <View style={styles.colum1}>
                <Image style={styles.lojaImage} source={require('./views/img/logoLoja.png')} />
            </View>

            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>Nome Restaurante </Text>
                <Text style={styles.text}>{categoria}</Text>
                <Text style={styles.text}>{tempoMin}-{tempoMax} min • {frete}</Text>
            </View>

            <View style={styles.colum3}>
                <TouchableOpacity onPress={flagFavorite} style={styles.iconWrapper}>
                    <View style={styles.iconBackground}><Image style={styles.icon} source={heartImageSource} /></View>
                </TouchableOpacity>
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
    },
    colum1: {
        flex: 1.2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 20,
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
        fontSize: 12,
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
        fontSize: 15,
        fontWeight: '600',
    },
});
