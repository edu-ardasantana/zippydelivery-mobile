import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Image
                style={styles.logo}
                source={require('/views/img/logo3.png')}
            />
            <Text style={styles.info}>© 2023 - Todos os direitos reservados.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#00111A',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 15,
        marginRight: 15,
    },
    info: {
        color: '#C4C4CC',
        fontSize: 10,
    }
});
