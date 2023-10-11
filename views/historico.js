import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function Historico({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>
                <Text style={[styles.title1, { marginTop: 30 }]}>Seus pedidos anteriores</Text>
            </View>

            <View style={styles.body}>

            </View>
            <Footer />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title1: {
        color: '#0D0D0D',
        fontSize: 22,
        letterSpacing: 1.2,
        fontWeight: 'bold',
        marginBottom: 10,
      },
})