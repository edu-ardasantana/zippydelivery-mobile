import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LojaProps {
    nome: string;
    categoria: string;
    imgPerfil: string;
    taxaFrete: string;
    tempoEntrega: string;
}

export default function Loja({
    nome = 'Nome não informado',
    categoria = 'Sem categoria',
    imgPerfil = 'https://via.placeholder.com/60',
    taxaFrete = '0',
    tempoEntrega = '0',
}: LojaProps) {

    function formatarMoeda(dataParam: number | string) {
        const valor = typeof dataParam === 'string' ? parseFloat(dataParam) : dataParam;
        return valor
            ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : 'R$ 0,00';
    }

    const tempoMin = parseInt(tempoEntrega, 10);
    const tempoMax = tempoMin + 10;

    return (
        <View style={styles.slide}>
            <View style={styles.colum1}>
                <Image
                    style={styles.lojaImage}
                    source={{ uri: imgPerfil }}
                    accessibilityLabel={`Imagem de perfil da loja ${nome}`}
                />
            </View>
            <View style={styles.colum2}>
                <Text style={styles.nomeItem}>{nome}</Text>
                <Text style={styles.text}>
                    {tempoMin}-{tempoMax} min • {categoria} • {formatarMoeda(taxaFrete)}
                </Text>
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
        marginVertical: 4,
        paddingHorizontal: 5,
        paddingVertical: 14,
    },
    colum1: {
        flex: 1.2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
        maxWidth: 100,
        maxHeight: undefined,
        overflow: 'visible',
    },
    colum2: {
        flex: 2.5,
        flexDirection: 'column',
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
