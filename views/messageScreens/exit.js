import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


export default function Exit({ navigation }) {

    return (
        <View style={styles.container}>

            <View style={styles.body}>
                <Image style={styles.iconMessage} source={require('../../views/img/exitIcon.png')} />
                <Text style={styles.title1}>Oh, no! Você está nos deixando...</Text>
                <Text style={styles.title2}>Tem certeza?</Text>

                <View style={styles.confirmacao}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.iconWrapper}>
                        <Text style={styles.title3}>Sim, quero sair</Text>
                    </TouchableOpacity>
                    <Button
                        style={styles.buttonContainer}
                        title="Não, tô brincando!"
                        buttonStyle={styles.addButton}
                        titleStyle={styles.addButtonTitle}
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        justifyContent: 'center',
    },
    iconWrapper: {
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
    },
    title1: {
        color: '#0D0D0D',
        fontSize: 18,
        letterSpacing: -0.5,
        fontWeight: 'bold',
    },
    title2: {
        color: '#FF9431',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.7,
        marginBottom: 15,
        marginTop: 2,
    },
    title3: {
        color: '#0D0D0D',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.7,
        marginBottom: 20,
    },
    confirmacao:{
        alignItems: 'center',
        marginTop: 80,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#FF9431',
        width: 250,
        height: 35,
    },
    addButtonTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
})