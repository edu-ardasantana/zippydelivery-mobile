import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/footer';
import Pedido from '../components/pedido';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/components/linkApi';


export default function Historico({ navigation }) {

    const [lista, setLista] = useState([]);
    const [token, setToken] = useState("");
    console.log('token ', token)

    useEffect(() => {
        const fetchToken = async () => {
          const storedToken = await AsyncStorage.getItem('token');
          if (storedToken) {
            console.log("tokenMenu", token)
            setToken(storedToken);  // Atualiza o token
          }
        };
        fetchToken();  // Carrega o token ao inicializar o componente
      }, []);
    
      useEffect(() => {
        // Verifica se o token existe antes de tentar fazer a requisição
        if (token) {
          const carregarLista = async () => {
            try {
              const response = await axios.get(`${API_URL}/api/pedido`, {
                headers: {
                  Authorization: `Bearer ${token}`,  // Adicionando o token ao cabeçalho
                },
              });
              console.log(response.data);
              setLista(response.data);
            } catch (error) {
              console.error('Erro ao carregar lista:', error);
            }
          };
      
          carregarLista();
        }
      }, [token]); // O useEffect só será disparado quando o token mudar

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Text style={styles.title1}>Seus pedidos anteriores</Text>
            </View>
            <ScrollView>
  <View style={styles.body}>
    {lista.map((pedido, index) => {
      let qtd = 0;
      let produtos = [];
      pedido.itensPedido.map(item => {
        qtd += item.qtdProduto;
        produtos.push(item.produto.titulo);
      });

      return (
        <Pedido
        key={index}
        quantity={qtd}
        restaurantName={pedido.empresa?.nome || "Restaurante desconhecido"}  // Valor default caso 'nome' seja undefined
        orderName={produtos[0] || "Produto desconhecido"}  // Valor default caso 'produtos' esteja vazio
        orderStatus={pedido.statusPedido || "Status desconhecido"}
        orderNumber={pedido.id || "ID desconhecido"}
        quantityItemsOrder={pedido.itensPedido?.length || 0}
        onPress={() => navigation.navigate("DetalhePedido", { pedido })}
      />
      
      );
    })}
  </View>
</ScrollView>

            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    headerContent: {
        flexDirection: 'column',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
    },
    iconWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title1: {
        fontSize: 20,
        fontWeight: '645',
    },
    body: {
        alignItems: 'center',
    },
    bodyContent: {
        height: 160,
        width: '90%',
        borderRadius: 5,
        borderColor: '#E6E6E6',
        borderWidth: 1.4,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 15,
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    box: {
        width: '96%',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    infoGeral: {
        flexDirection: 'row',
        marginTop: 10,
    },
    infoEspecifica: {
        marginTop: 5,
        paddingLeft: 23,
    },
    title2: {
        color: '#0D0D0D',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 5,
    },
    title3: {
        color: '#4D585E',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 5,
    },
    text: {
        color: '#7C7C8A',
        fontSize: 12,
        fontWeight: '400',
        padding: 10,
        letterSpacing: 1.2,
    },
    button: {
        width: '95%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
