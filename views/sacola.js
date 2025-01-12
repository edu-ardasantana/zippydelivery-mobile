
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
    const isFocused = useIsFocused();

    const [getCupom, setCupom] = useState('');
    const [cupomInfo, setCupomInfo] = useState(null);

    const { cart, setCart } = useMyContext();
    const produtosDaEmpresa = cart.filter((produto) => produto.categoria.empresa.id === idEmpresa);
    const agora = new Date();

    const limparSacola = () => {
        setCart([]);
    };

    useEffect(() => {
        // Carregar dados do AsyncStorage
        const loadData = async () => {
            try {
                await AsyncStorage.setItem('var', 'sacola');
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

    function aplicarCupom() {
        axios
            .get(`${API_URL}/api/cupom/codigo/${getCupom}`)
            .then(function (response) {
                if (response.data && response.data.quantidadeMaximaUso > 0) {
                    const [ano, mes, dia] = response.data.fimVigencia;
                    const fimVigencia = new Date(ano, mes - 1, dia);
                    if (fimVigencia >= agora) {
                        setCupomInfo(response.data);
                    } else {
                        setCupomInfo(null);
                        console.log('Cupom inválido ou expirado.');
                    }
                } else {
                    setCupomInfo(null);
                    console.log('Cupom inválido ou inexistente.');
                }
            })
            .catch(function (error) {
                console.log('Erro ao aplicar cupom:', error);
            });
    }

    useEffect(() => {
        if (userId) {
            axios
                .get(`${API_URL}/api/cliente/user/${userId}`)
                .then(function (response) {
                    setEndereco(response.data);
                })
                .catch(function (error) {
                    console.log('Erro ao carregar endereço:', error);
                });
        }
    }, [userId, isFocused]);

    useEffect(() => {
        if (cart.length === 0) {
            setButtonTitle('Ir às compras');
            setButtonAction('Home');
        } else {
            setButtonTitle('Continuar');
            setButtonAction('ResumoSacola');
        }
    }, [cart]);

    let enderecoCompleto;
    if (!getEndereco.logradouro) {
        enderecoCompleto = null;
    } else {
        enderecoCompleto = `${getEndereco.logradouro} - ${getEndereco.bairro}, ${getEndereco.cidade} - ${getEndereco.estado} ${getEndereco.complemento}`;
    }

    const renderCartItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('DetalheItem', { produto: item, origin: 'Sacola' })}>
                <ItemSacola item={item} />
            </TouchableOpacity>
        </View>
    );

    var desconto = 0;
    const cartTotal = cart.reduce((total, cartItem) => {
        const itemPrice = cartItem.preco * cartItem.quantity;
        desconto = cupomInfo === null ? 1 : 1 - cupomInfo.percentualDesconto / 100;
        return (total + itemPrice) * desconto;
    }, 0);

    function formatarMoeda(dataParam) {
        return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
    }
    return (
        <View style={styles.container}>

            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
                    <Image style={styles.icon} source={{ uri: 'https://api.iconify.design/solar:alt-arrow-left-outline.svg' }} />
                </TouchableOpacity>
                <Text style={styles.title}>SACOLA</Text>

                <TouchableOpacity onPress={limparSacola}>
                    <Text style={styles.limpar}>Limpar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.enderecoTitle}>Entregar no endereço</Text>

            {enderecoCompleto === null ?
                <View style={styles.semEndereco}>
                    <TouchableOpacity onPress={() => navigation.navigate('FormEndereco', { origin: 'Sacola' })}>
                        {cart.length !== 0 &&
                            <Text style={styles.limpar}>Escolher endereço</Text>
                        }
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.endereco}>
                    {cart.length > 0 ? (
                        <>
                            <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
                            <Text style={styles.enderecoText}>{enderecoCompleto}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('FormEndereco', { origin: 'Sacola' })}>
                                <Text style={styles.limpar}>Trocar</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                </View>
            }
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
            </View>
            {cart.length === 0 && (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                    <Image style={{ height: 200, width: 200, alignSelf: 'center' }} source={{ uri: 'https://api.iconify.design/material-symbols:shopping-cart-outline-sharp.svg?color=%23e6e6e6', }}></Image>
                    <Text style={{ padding: 10, textAlign: 'center', fontWeight: '500', color: '#4D585E' }}>O seu carrinho está vazio!</Text>
                </View>)}
            
            {cart.length > 0 && (
                <FlatList
                    data={cart}
                    keyExtractor={(item => item.id.toString())}
                    renderItem={renderCartItem}
                />
            )}
            {cart.length > 0 && (
                <Text style={{ paddingHorizontal: 20, fontWeight: 600, marginTop: 20 }}>Taxa de entrega: {cart[0].categoria.empresa.taxaFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            )}
            {cart.length > 0 && (
                <View style={styles.espacoCupom}>
                    <TextInput
                        style={styles.inputCupom}
                        placeholder='Código do cupom'
                        placeholderTextColor='#C4C4CC'
                        onChangeText={text => { setCupom(text); console.log(text); }}
                    />
                    <Button
                        buttonStyle={styles.buttonCupom}
                        title={"Aplicar"}
                        onPress={() => aplicarCupom()}
                        disabled={enderecoCompleto === null && cart.length > 0}
                        titleStyle={styles.buttonText}
                    />
                </View>
            )}
            {/* <br /> */}
            <View style={styles.footerContainer}>
                {cart.length > 0 && (
                    <View style={styles.footer2}>
                        <Text style={styles.footerText}>Total com a entrega:</Text>
                        {cupomInfo ? (
                            <>
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={styles.preco}>
                                        {formatarMoeda(
                                            (cartTotal + cart[0].categoria.empresa.taxaFrete)
                                        )}
                                    </Text>
                                    <Text style={styles.sobreCupom}>
                                        Desconto do cupom aplicado: {cupomInfo.percentualDesconto}%
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <Text style={styles.preco}>
                                {formatarMoeda(cartTotal + cart[0].categoria.empresa.taxaFrete)}
                            </Text>
                        )}
                    </View>
                )}
                {(enderecoCompleto === null && cart.length > 0) && (
                    <Text style={{ paddingTop: 20, alignSelf: 'center', fontWeight: 'bold' }}>
                        Para continuar, informe um{' '}
                        <Link to="/FormEndereco" state={{ origin: 'Sacola' }} style={{ color: '#FF9431' }}>
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
        fontWeight: '600'
    },
    semEndereco: {
        padding: 20,
        alignItems: 'center',
        textDecorationLine: 'underline',
        textDecorationColor: '#FF9431'
    },
    endereco: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    enderecoText: {
        marginStart: 5,
        fontSize: 14,
        justifyContent: 'space-between',
    },
    enderecoTitle: {
        fontWeight: 500,
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
        backgroundColor: "white",
        //margin: 0,
        //width: "100%",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor:'#FF9431',
        //paddingVertical: 10,
        //borderBottomWidth: 0,
        //shadowColor: '#000',
        //shadowOffset: { width: 0, height: 1.5 },
        //shadowOpacity: 0,
      //  shadowRadius: 3,
       // elevation: 5,
        height: 150,
    },
    footer2: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        //backgroundColor: 'red'
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
        borderRadius: 5
    },
});
