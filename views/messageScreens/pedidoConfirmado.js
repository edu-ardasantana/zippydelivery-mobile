import axios from 'axios';
import Footer from '../component/footer';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

export default function PedidoConfirmado({ route, navigation }) {

    const [pedidoExiste, setPedidoExiste] = useState(true);
    const idPedido =localStorage.getItem("idPedido");
    const [getStatusPedido, setStatusPedido] = useState();
    const [getTempoEntrega, setTempoEntrega] = useState();
    const [getLogradouro, setLogradouro] = useState();
    const [getBairro, setBairro] = useState();
    const [getCidade, setCidade] = useState();
    const [getEstado, setEstado] = useState();
    const [getComplemento, setComplemento] = useState();
    const [getNomeEmpresa, setNomeEmpresa] = useState();
    const [getNumeroPedido, setNumeroPedido] = useState();
    const [getFormaPagamento, setFormaPagamento] = useState();
    const [getValorTotal, setValorTotal] = useState();
    const [getImgEmpresa, setImgEmpresa] = useState();

    useEffect(() => {
        setPedidoExiste(true);
    }, []);

    useEffect(() => {
        axios.get(`http://api.projetopro.live/api/pedido/${idPedido}`)
            .then(function (response) {
                setStatusPedido(response.data.statusPedido)
                setTempoEntrega(response.data.empresa.tempoEntrega)
                setLogradouro(response.data.logradouro)
                setBairro(response.data.bairro)
                setCidade(response.data.cidade)
                setEstado(response.data.estado)
                setComplemento(response.data.complemento)
                setNomeEmpresa(response.data.empresa.nome)
                setNumeroPedido(response.data.id)
                setFormaPagamento(response.data.formaPagamento)
                setValorTotal(response.data.valorTotal)
                setImgEmpresa(response.data.empresa.imgPerfil)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    function cancelarPedido() {
        axios.delete(`http://api.projetopro.live/api/pedido/${idPedido}`)
        .then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            showMessage({
                message: `Algo deu errado: ${error}`,
                type: "danger",
            });
        });
        setPedidoExiste(false);
    }

    function formatarMoeda(dataParam) {
        return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
    }


    return (
        <View style={styles.container}>
            {pedidoExiste ? (
                <ScrollView >
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                            <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.cabeca}>
                            <Image style={styles.iconMessage} source={require('../img/responseIconSuccess.png')} />
                            <Text style={styles.title1}>Pedido realizado!</Text>
                            <Text style={styles.title2}>O restaurante foi notificado do seu pedido</Text>
                        </View><br />
                        <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
                        <View style={styles.statusContainer}>
                            <Text style={styles.subTitle}>Status do Pedido</Text>
                            <View style={styles.statusPedido}>
                                <Text style={styles.text}>{getStatusPedido}</Text>
                                <Text style={styles.text}>Entrega hoje, {getTempoEntrega} min</Text>
                            </View>
                        </View><br />
                        <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
                        <View style={styles.enderecoContainer}>
                            <Text style={styles.subTitle}>Entrega em</Text>
                            <Text style={styles.textEndereco}>{getLogradouro} {'\n'}{getBairro} - {getCidade}, {getEstado} {'\n'}{getComplemento}</Text>
                        </View>
                        <View style={styles.enderecoContainer}>
                            <Text style={styles.subTitle}>Detalhes do pedido</Text>
                            <View style={styles.infoLoja}>
                                <Image style={styles.lojaImage} source={getImgEmpresa} />
                                <View style={styles.infoPedido}>
                                    <Text style={styles.text}>{getNomeEmpresa}</Text>
                                    <Text style={styles.textinho}>Pedido Nº {getNumeroPedido}</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('DetalhePedido', idPedido)} style={styles.iconWrapper}>
                                    <Image style={[styles.icon, { rotate: '180deg', marginEnd: 10 }]} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
                            <View style={styles.infoPagamento}>
                                <View style={styles.infoPagamentoLine}>
                                    <Text style={styles.text}>Forma de pagamento</Text>
                                    <Text style={styles.textinho}>{getFormaPagamento}</Text>
                                </View>
                                <View style={styles.infoPagamentoLine}>
                                    <Text style={styles.text}>Total</Text>
                                    <Text style={styles.text}>{formatarMoeda(getValorTotal)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={"Cancelar pedido"}
                                buttonStyle={styles.addButton}
                                titleStyle={styles.addButtonTitle}
                                onPress={cancelarPedido}
                            />
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView >
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                            <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>

                        <View style={styles.cabeca}>
                            <Image style={styles.iconMessage} source={require('../img/responseIconFailure.png')} />
                            <Text style={[styles.title1,{ color: '#92000E'}]}>Pedido cancelado</Text>
                            <Text style={styles.title2}>Fique tranquilo, nenhuma cobrança será feita</Text>
                        </View><br /> 
                        <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
                        
                        <View style={styles.enderecoContainer}>
                            <Text style={styles.subTitle}>Detalhes do pedido</Text>
                            <View style={styles.infoLoja}>
                                <Image style={styles.lojaImage} source={getImgEmpresa} />
                                <View style={styles.infoPedido}>
                                    <Text style={styles.text}>{getNomeEmpresa}</Text>
                                    <Text style={styles.textinho}>Pedido Nº {getNumeroPedido}</Text>
                                </View>
                            </View>
                            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
                            <View style={styles.infoPagamento}>
                                <View style={styles.infoPagamentoLine}>
                                    <Text style={styles.text}>Forma de pagamento</Text>
                                    <Text style={styles.textinho}>{getFormaPagamento}</Text>
                                </View>
                                <View style={styles.infoPagamentoLine}>
                                    <Text style={styles.text}>Total</Text>
                                    <Text style={styles.text}>{formatarMoeda(getValorTotal)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
            <Footer />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
    },
    cabeca: {
        alignItems: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    enderecoContainer: {
        width: '90%',
        borderRadius: 5,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.13,
        shadowRadius: 5,
        marginStart: 18,
        paddingTop: 10,
        marginBottom: 9,
    },
    statusPedido: {
        flexDirection: 'column',
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
        width: 80,
        height: 75,
        marginBottom: 30,
        marginTop: 20,
    },
    title1: {
        color: '#FF9431',
        fontSize: 20,
        fontWeight: 500,
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: 450,
        marginBottom: 15,
        marginTop: 5,
    },
    title3: {
        color: '#AB222E',
        fontSize: 13,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginTop: 70,
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginEnd: 20,
        marginTop: 15,
        marginBottom: 50,
    },
    addButton: {
        backgroundColor: 'transparent',
        width: 100,
        height: 30,
        padding: 0,
        borderColor: '#92000E',
        borderWidth: 1,
    },
    addButtonTitle: {
        color: '#92000E',
        fontSize: 12,
        fontWeight: 500,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#F3F3F3",
    },
    subTitle: {
        fontWeight: 500,
        paddingHorizontal: 20,
        fontSize: 15,
    },
    text: {
        fontSize: 13,
    },
    textEndereco: {
        fontSize: 12,
        paddingLeft: 20,
        marginVertical: 20,
        color: '#76797B'
    },
    textinho: {
        fontSize: 12,
        color: '#76797B'
    },
    infoLoja: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 20,
        justifyContent: 'space-between',
    },
    lojaImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginVertical: 10,
        marginEnd: 0,
    },
    infoPedido: {
        paddingEnd: 50
    },
    infoPagamento: {
        marginBottom: 20
    },
    infoPagamentoLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 1,
    },
})