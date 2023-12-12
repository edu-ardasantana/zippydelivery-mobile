import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Footer from './component/footer';

export default function DetalhePedido({ route, navigation }) {

    const { pedido }  = route.params;
    console.log(pedido)

    function calcularSubtotal (itensPedido) {
        return itensPedido.reduce((subtotal, item) => subtotal + item.qtdProduto * item.valorUnitario, 0);
    }

    function calcularTotal(itensPedido, taxaEntrega = 0) {
        const subtotal = calcularSubtotal(itensPedido);
        return subtotal + taxaEntrega;
    }

    return (

        <View style={styles.container}>

            <View style={styles.headerContent}>

                <TouchableOpacity onPress={() => navigation.navigate('Historico')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/material-symbols:arrow-back-ios-new-rounded.svg' }} />
                </TouchableOpacity>

                <Text style={styles.titlePagina}>Detalhes do pedido</Text>

            </View>

            <Text style={styles.title}>{pedido.empresa.nome}</Text>
            <Text style={styles.info}>Pedido {pedido.status} • Nº {pedido.id}</Text>
            <ScrollView>
            {
                pedido.itensPedido.map((item, index) => (
                    <View key={index} style={styles.item}>
                    {/* Use a tag <Image /> para exibir uma imagem */}
                    <Image style={styles.itemImage} source={require('../views/img/item.png')} />

                    <View style={styles.resumoPedido}>
                        {/* Exiba as informações do pedido */}
                        <Text style={styles.h1}>{item.produto.titulo}</Text>
                        <Text style={styles.h1}>{item.produto.descricao}</Text>
                        <Text style={[styles.h1]}>{item.qtdProduto}x R$ {item.valorUnitario.toFixed(2)}</Text>
                        <Text style={{ color: '#FF9431', paddingLeft: 20 }}>
                        <strong>{`R$ ${(item.qtdProduto * item.valorUnitario).toFixed(2)}`}</strong>
                        </Text>
                    </View>
                    </View>
                ))
                } 
            </ScrollView>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            <View>
                <Text style={styles.h1}>Resumo de valores:</Text>
            </View>

            <View style={styles.resumo}>
                <Text>Subtotal</Text> 
                <Text>{`R$ ${calcularSubtotal(pedido.itensPedido).toFixed(2)}`}</Text>
            </View>

            <View style={styles.resumo}>
                <Text>Taxa de entrega</Text> 
                <Text>R$ {pedido.empresa.taxaFrete}</Text>
            </View>

            <View style={styles.resumo}>
                <Text><strong>Total</strong></Text> <Text><strong>{`R$ ${calcularTotal(pedido.itensPedido, pedido.empresa.taxaFrete).toFixed(2)}`}</strong></Text>
            </View><br />

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.pagamento}>
                <Text style={styles.h1}>Pagamento pelo app</Text>

                <Image style={styles.logoCartao} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/langpt-1500px-Mastercard_2019_logo.svg.png' }}/>

                <Text style={styles.blocoText}>Mastecard **** 0987</Text>
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>
            <View>
                <Text style={styles.h1}>Endereço de entrega</Text>
            </View>
            <View style={styles.bloco}>
                <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />

                <Text style={styles.blocoText}>{pedido.cliente.logradouro}, {pedido.cliente.bairro} - {pedido.cliente.cidade} / {pedido.cliente.estado}<br/>Ponto de referência: {pedido.cliente.complemento}
                </Text>

            </View>
            <View>
                <TouchableOpacity style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Adicionar à sacola</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <Footer />
            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 100,
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
    titlePagina: {
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#FF9431',
        marginLeft: 60,
    },
    title: {
        marginTop: 20,
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 20,
    },
    info: {
        paddingLeft: 10,
        color: '#4D585E',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 5,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 7,
        marginVertical: 10,

    },
    itemText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        marginVertical: 10,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        justifyContent: 'center'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#FF9431'
    },
    bloco: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    menuIcon: {
        width: 20,
        height: 20,
        tintColor: '#FF9431',
        marginVertical: 20,
        marginHorizontal: 15,
    },
    blocoText: {
        fontSize: 11
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#dbdbe7',
    },
    h1: {
        fontWeight: 'bold',
        paddingHorizontal: 20,
        fontSize: 15,
    },
    pagamento: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoCartao: {
        width: 35,
        height: 22,
        marginVertical: 20,
        marginHorizontal: 8,
    },
    resumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

    },
    resumoPedido: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})