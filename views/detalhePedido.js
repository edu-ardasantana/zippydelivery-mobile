import React from 'react';
import Footer from './component/footer';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function DetalhePedido({ route, navigation }) {

    const { pedido } = route.params;

    function calcularSubtotal(itensPedido) {
        return itensPedido.reduce((subtotal, item) => subtotal + item.qtdProduto * item.valorUnitario, 0);
    }

    function calcularTotal(itensPedido, taxaEntrega = 0) {
        const subtotal = calcularSubtotal(itensPedido);
        return subtotal + taxaEntrega;
    }

    function formatarMoeda(dataParam) {
        return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
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
            <Text style={styles.info}>{pedido.statusPedido} • Nº {pedido.id}</Text>
            <View>
                {pedido.itensPedido.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Image style={styles.itemImage} source={item.produto.imagem} />
                        <View style={styles.resumoPedido}>
                            <Text style={styles.subTitle2}>{item.produto.titulo}</Text>
                            <Text style={styles.subTitle2}>{item.qtdProduto}</Text>
                        </View>
                        <Text style={[styles.text, { color: '#FF9431', paddingVertical: 5 }]}>{formatarMoeda((pedido.valorTotal))}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
            <Text style={styles.subTitle}>Resumo de valores</Text>
            <View style={styles.resumo}>
                <Text>Subtotal</Text>
                <Text>{formatarMoeda(calcularSubtotal(pedido.itensPedido))}</Text>
            </View>
            <View style={styles.resumo}>
                <Text>Taxa de entrega</Text>
                <Text>{formatarMoeda(pedido.empresa.taxaFrete)}</Text>
            </View>
            <View style={styles.resumo}>
                <Text><strong>Total</strong></Text> <Text><strong>{`R$ ${calcularTotal(pedido.itensPedido, pedido.empresa.taxaFrete).toFixed(2)}`}</strong></Text>
            </View><br />
            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
            <View style={styles.pagamento}>
                <Text style={styles.subTitle}>Pagamento pelo app</Text>
                <Text style={styles.blocoText}>{pedido.formaPagamento}</Text>
            </View>
            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
            <Text style={styles.subTitle}>Endereço de entrega</Text>
            <View style={styles.bloco}>
                <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
                <Text style={styles.blocoText}>{pedido.cliente.logradouro}, {pedido.cliente.bairro} {'\n'}{pedido.cliente.cidade} - {pedido.cliente.estado}{'\n'}{pedido.cliente.complemento}</Text>
            </View>
            <View style={styles.dividerContainer}><View style={styles.dividerLine} /></View>
            <TouchableOpacity style={{marginBottom: 40}}>
                <Text style={styles.buttonText}>Adicionar à sacola</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    )
};

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
        fontWeight: 500,
        fontSize: 15,
        color: '#FF9431',
        marginLeft: 60,
    },
    title: {
        marginTop: 20,
        marginLeft: 30,
        fontWeight: 550,
        fontSize: 20,
    },
    info: {
        color: '#4D585E',
        fontSize: 14,
        fontWeight: 500,
        marginLeft: 30,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 7,
        marginVertical: 10,
    },
    itemText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        alignSelf: 'center',
        color: '#FF9431',
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
        backgroundColor: '#f3f3f3',
    },
    subTitle: {
        fontWeight: 500,
        paddingHorizontal: 20,
        fontSize: 15,
    },
    subTitle2: {
        fontWeight: 500,
        paddingHorizontal: 20,
        fontSize: 14,
    },
    text: {
        fontSize: 14,
    },
    pagamento: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 25,
        height: 40,
    },
    resumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    resumoPedido: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 60,
        paddingVertical: 5
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

})