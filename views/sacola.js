import axios from 'axios';
import { useMyContext } from './myContext';
import { Button } from 'react-native-elements';
import ItemSacola from '../components/itemSacola';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useIsFocused } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_URL } from '@/components/linkApi';

export default function Sacola({ navigation }) {
    const [idEmpresa, setIdEmpresa] = useState(null);
    const [userId, setUserId] = useState(null);
    const [buttonTitle, setButtonTitle] = useState('Continuar');
    const [buttonAction, setButtonAction] = useState('ResumoSacola');
    const [getEndereco, setEndereco] = useState([]);
    const [getCupom, setCupom] = useState('');
    const [cupomInfo, setCupomInfo] = useState(null);
    const [token, setToken] = useState('');
    const isFocused = useIsFocused();
    const { cart, setCart } = useMyContext();
    const agora = new Date();

    // Carregar o token
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };
        fetchToken();
    }, []);

    // Carregar dados de AsyncStorage
    useEffect(() => {
        const loadData = async () => {
            try {
                const empresaId = await AsyncStorage.getItem('idEmpresa');
                const usuarioId = await AsyncStorage.getItem('id');
                setIdEmpresa(parseInt(empresaId, 10));
                setUserId(parseInt(usuarioId, 10));
            } catch (error) {
                console.log('Erro ao carregar dados do AsyncStorage:', error);
            }
        };
        loadData();
    }, []);

    // Aplicar cupom
    const aplicarCupom = () => {
        if (!getCupom) return;

        axios
            .get(`${API_URL}/api/cupom/codigo/${getCupom}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const cupomData = response.data;
                if (cupomData && cupomData.quantidadeMaximaUso > 0) {
                    const [ano, mes, dia] = cupomData.fimVigencia;
                    const fimVigencia = new Date(ano, mes - 1, dia);
                    if (fimVigencia >= agora) {
                        setCupomInfo(cupomData);
                    } else {
                        setCupomInfo(null);
                        console.log('Cupom expirado.');
                    }
                } else {
                    setCupomInfo(null);
                    console.log('Cupom inválido.');
                }
            })
            .catch((error) => {
                console.log('Erro ao aplicar cupom:', error);
            });
    };

    // Carregar endereço
    useEffect(() => {
        if (userId && token) {
            axios
                .get(`${API_URL}/api/cliente/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.data && response.data.enderecos) {
                        setEndereco(response.data); // Ou somente response.data.enderecos se necessário
                    } else {
                        console.log('Nenhum endereço encontrado.');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao carregar endereço:', error);
                });
        }
    }, [userId, token, isFocused]);
    

    // Atualizar estado do botão com base no carrinho
    useEffect(() => {
        if (cart.length === 0) {
            setButtonTitle('Ir às compras');
            setButtonAction('Home');
        } else {
            setButtonTitle('Continuar');
            setButtonAction('ResumoSacola');
        }
    }, [cart]);

    const limparSacola = () => {
        setCart([]);
    };

    const enderecoCompleto = getEndereco.enderecos && getEndereco.enderecos[0] && getEndereco.enderecos[0].logradouro
    ? `${getEndereco.enderecos[0].logradouro} - ${getEndereco.enderecos[0].bairro}, ${getEndereco.enderecos[0].cidade} - ${getEndereco.enderecos[0].estado} ${getEndereco.enderecos[0].complemento}`
    : null;



    // Renderizar item do carrinho
    const renderCartItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('DetalheItem', { produto: item, origin: 'Sacola' })}>
                <ItemSacola item={item} />
            </TouchableOpacity>
        </View>
    );

    // Calcular o total do carrinho
    let desconto = 0;
    const cartTotal = cart.reduce((total, cartItem) => {
        const itemPrice = cartItem.preco * cartItem.quantity;
        desconto = cupomInfo ? 1 - cupomInfo.percentualDesconto / 100 : 1;
        return (total + itemPrice) * desconto;
    }, 0);

    // Formatar valor para moeda
    const formatarMoeda = (valor) => {
        return valor ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")} />
                </TouchableOpacity>
                <Text style={styles.title}>SACOLA</Text>
                <TouchableOpacity onPress={limparSacola}>
                    <Text style={styles.limpar}>Limpar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.enderecoTitle}>Entregar no endereço</Text>

            {enderecoCompleto ? (
                <View style={styles.endereco}>
                    <Image style={styles.menuIcon} source={require('../assets/images/iconFooter/material-symbols--location-on-rounded.png')} />
                    <Text style={styles.enderecoText}>{enderecoCompleto}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('FormEndereco', { origin: 'Sacola' })}>
                        <Text style={styles.limpar}>Trocar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.semEndereco}>
                    <TouchableOpacity onPress={() => navigation.navigate('FormEndereco', { origin: 'Sacola' })}>
                        {cart.length !== 0 && <Text style={styles.limpar}>Escolher endereço</Text>}
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>

            {cart.length === 0 && (
                <View style={styles.emptyCartMessage}>
                    <Image style={styles.emptyCartImage} source={require("../assets/images/iconFooter/material-symbols--shopping-cart-outline-sharp.png")} />
                    <Text style={styles.emptyCartText}>O seu carrinho está vazio!</Text>
                </View>
            )}

            {cart.length > 0 && (
                <FlatList data={cart} keyExtractor={(item) => item.id.toString()} renderItem={renderCartItem} />
            )}

            {cart.length > 0 && (
                <Text style={styles.deliveryFeeText}>
                    Taxa de entrega: {cart[0].categoria.empresa.taxaFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
            )}

            {cart.length > 0 && (
                <View style={styles.espacoCupom}>
                    <TextInput
                        style={styles.inputCupom}
                        placeholder='Código do cupom'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={setCupom}
                    />
                    <Button
                        buttonStyle={styles.buttonCupom}
                        title="Aplicar"
                        onPress={aplicarCupom}
                        disabled={enderecoCompleto === null && cart.length > 0}
                        titleStyle={styles.buttonText}
                    />
                </View>
            )}

            <View style={styles.footerContainer}>
                {cart.length > 0 && (
                    <View style={styles.footer2}>
                        <Text style={styles.footerText}>Total com a entrega:</Text>
                        {cupomInfo ? (
                            <Text style={styles.preco}>
                                {formatarMoeda(cartTotal + cart[0].categoria.empresa.taxaFrete)}
                            </Text>
                        ) : (
                            <Text style={styles.preco}>
                                {formatarMoeda(cartTotal + cart[0].categoria.empresa.taxaFrete)}
                            </Text>
                        )}
                    </View>
                )}

                {enderecoCompleto === null && cart.length > 0 && (
                    <Text style={styles.addressWarning}>
                        Para continuar, informe um{' '}
                        <Link to="/FormEndereco" state={{ origin: 'Sacola' }} style={styles.addressLink}>
                            endereço
                        </Link>{' '}
                        para entrega
                    </Text>
                )}

                <Button
                    buttonStyle={styles.button}
                    title={buttonTitle}
                    onPress={() => navigation.navigate(buttonAction, { cupomInfo })}
                    disabled={enderecoCompleto === null && cart.length > 0}
                />
            </View>
        </View>
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
        paddingHorizontal: 10,
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#FF9431',
    },
    title: {
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 15,
    },
    limpar: {
        paddingHorizontal: 20,
        color: '#FF9431',
        fontWeight: '600',
    },
    semEndereco: {
        padding: 20,
        alignItems: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#FF9431',
    },
    endereco: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    enderecoText: {
        marginStart: 5,
        fontSize: 14,
    },
    enderecoTitle: {
        fontWeight: '500',
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#dbdbe7',
    },
    menuIcon: {
        width: 20,
        height: 20,
        tintColor: '#FF9431',
        marginVertical: 30,
        marginHorizontal: 15,
    },
    footerContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: '#FF9431',
        height: 150,
    },
    footer2: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    footerText: {
        paddingRight: 25,
        fontSize: 20,
    },
    preco: {
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        marginTop: 40,
        backgroundColor: '#FF9431',
        height: 40,
        width: 300,
        borderRadius: 5,
    },
    addressWarning: {
        paddingTop: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    addressLink: {
        color: '#FF9431',
    },
    emptyCartMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartImage: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    emptyCartText: {
        padding: 10,
        textAlign: 'center',
        fontWeight: '500',
        color: '#4D585E',
    },
    deliveryFeeText: {
        paddingHorizontal: 20,
        fontWeight: 600,
        marginTop: 20,
    },
    espacoCupom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputCupom: {
        height: 40,
        borderWidth: 1,
        borderColor: '#C4C4CC',
        paddingLeft: 10,
        width: '70%',
    },
    buttonCupom: {
        width: '25%',
        height: 40,
        backgroundColor: '#FF9431',
    },
    buttonText: {
        fontWeight: '600',
    },
});
