import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ComeceAEntregar() {

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.headerContent}>
                <View style={styles.infoUsuario}>
                    <Image source={{ uri: 'https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=_XeYoSJQIN7GrE08cUQDJCo3U7yvoEp5OKpbhQzpmC0=' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.nomeUsuario}>Abinadabe</Text>
                        <Text style={styles.statusUsuario}>zippy a 2 meses</Text>
                    </View>
                </View>

                <View style={styles.statusWrapper}>
                    <Image source={require('../assets/images/iconFooter/Polygon.png')} style={styles.statusIcon} />
                    <Text style={styles.statusText}>Disponível</Text>
                </View>

            </View>

            <View>
                <View style={styles.estatisticasConteiner}>

                    <View style={styles.estatisticas}>
                        <View style={styles.blocoEstatistica}>
                            <Text style={styles.labelEstatistica}>Ganhos do dia</Text>
                            <Text style={{ fontWeight: 'bold', color: "black", fontSize: 20 }}>R$ 13,00</Text>
                            <Text style={styles.labelEstatistica}>Saldo mensal: <Text style={{ fontWeight: 'bold', color: "black" }}>R$ 373,12</Text></Text>
                        </View>

                        <View style={styles.blocoEstatistica}>
                            <View style={styles.linhaEstatistica}>
                                <Text style={styles.labelEstatistica}>Aceitas</Text>
                                <Text style={styles.valorEstatistica}>23</Text>
                            </View>
                            <View style={styles.linhaEstatistica}>
                                <Text style={styles.labelEstatistica}>Finalizadas</Text>
                                <Text style={styles.valorEstatistica}>20</Text>
                            </View>
                            <View style={styles.linhaEstatistica}>
                                <Text style={styles.labelEstatistica}>Recusadas</Text>
                                <Text style={styles.valorEstatistica}>2</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.estatisticas2}>
                        <View style={styles.blocoEstatistica2}>
                            <Text style={{ fontWeight: 'bold', color: "black", fontSize: 20 }}>72 km </Text>
                            <Text style={styles.labelEstatistica}> rodados </Text>
                            <Text style={{ fontWeight: 'bold', color: "black", fontSize: 20 }}> 2 h </Text>
                            <Text style={styles.labelEstatistica}> trabalhadas</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.botaoLargar}>
                                <Text style={styles.textoBotaoEntregar}>Largar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Image source={require('../assets/images/image.png')} style={styles.imagemMapa} />
                </View>


            </View>

            <View style={styles.footer}>
                <Image style={{}} source={require('../assets/images/iconFooter/my_location.png')} />
                <Text style={styles.footerText}>Localizando pedidos a serem entregues na região</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
    },
    statusWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        gap: 5,
    },
    statusIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#50A773',
    },
    infoUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 35,
    },
    nomeUsuario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    statusUsuario: {
        fontSize: 14,
        color: '#7D7D7D',
    },
    logoZippy: {
        width: 150,
        height: 40,
        resizeMode: 'contain',
    },
    estatisticasConteiner: {
        position: 'relative',
    },
    estatisticas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        gap: 10,
    },
    estatisticas2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginHorizontal: 25,
        gap: 10,
        position: 'absolute',
        top: -10,
        left: 10,
        right: 10,
        zIndex: 1,
        paddingTop: 130
    },
    blocoEstatistica: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,

    },
    blocoEstatistica2: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingHorizontal: 10,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,

    },
    linhaEstatistica: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    valorEstatistica: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    labelEstatistica: {
        fontSize: 14,
        color: '#7D7D7D',
    },
    imagemMapa: {
        width: '100%',
        height: 600,
        resizeMode: 'cover',
        marginTop: 40,
    },
    botaoLargar: {
        backgroundColor: '#EDD8DB',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 5,
        width: 85,
    },
    textoBotaoEntregar: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#92000E',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: "white",
        alignItems: 'center',
        borderTopColor: '#DDD',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        paddingVertical: 40,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0,
        shadowRadius: 3,
        elevation: 5,
        height: 60,

    },
    footerText: {
        fontSize: 14,
        color: '#50A773',
    },
});
