import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Item from '../components/item';
import Footer from '../components/footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/components/linkApi';

export default function HomeLoja({ navigation, route }) {
  const [empresa, setEmpresa] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = String(route.params.id); // Converte para string
        setIdEmpresa(userId);

        // Salvar o ID da empresa no AsyncStorage
        await AsyncStorage.setItem('idEmpresa', userId);

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Requisições paralelas
        const [empresaRes, categoriasRes, produtosRes] = await Promise.all([
          axios.get(`${API_URL}/api/empresa/${userId}`, { headers }),
          axios.get(`${API_URL}/api/categoria-produto/empresa/${userId}`, { headers }),
          axios.get(`${API_URL}/api/produto/categoria-empresa/${userId}`, { headers }),
        ]);

        setEmpresa(empresaRes.data);
        setCategorias(categoriasRes.data);
        setProdutos(produtosRes.data);

        console.log("Produtos recebidos:", produtosRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados: ', error);
      }
    };

    fetchData();
  }, [route.params.id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Cabeçalho */}
        <View style={styles.header}>
          {/* Imagem de fundo */}
          {empresa.imgCapa ? (
            <Image source={{ uri: empresa.imgCapa }} style={styles.backgroundImage} />
          ) : (
            <Text style={styles.textoVazio}>Imagem não disponível</Text>
          )}

          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
              <View style={styles.iconBackground}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <View style={styles.iconBackground}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/iconFooter/material-symbols--search-rounded.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.topo}>
            <Text style={[styles.title1, { marginTop: 20 }]}>{empresa.nome || "Nome da Empresa"}</Text>
          </View>

          {/* Categorias */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            style={styles.carousel}
          >
            {categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <TouchableOpacity key={index} style={styles.etiqueta}>
                  <Text style={styles.textoEtiqueta}>{categoria.descricao}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.textoVazio}>Nenhuma categoria disponível</Text>
            )}
          </ScrollView>

          {/* Produtos */}
          {produtos.length === 0 ? (
            <Text style={styles.textoVazio}>Nenhum produto ainda</Text>
          ) : (
            produtos.map((produtosCategoria, indexCategoria) => (
              <View key={indexCategoria}>
                <Text style={styles.title2}>
                  {produtosCategoria[0]?.categoria?.descricao || "Categoria"}
                </Text>
                {produtosCategoria.map((produto, indexProduto) => (
                  <TouchableOpacity
                    key={indexProduto}
                    style={styles.produtoContainer}
                    onPress={() => navigation.navigate("DetalheItem", { produto, origin: 'HomeLoja' })}
                  >
                    {/* Nome e descrição do produto */}
                    <View style={styles.produtoInfo}>
                      <Text style={styles.produtoTitulo}>{produto.titulo}</Text>
                      <Text style={styles.produtoDescricao}>{produto.descricao}</Text>
                      <Text style={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</Text>
                    </View>
            
                    {/* Imagem do produto */}
                    {produto.imagem ? (
                      <Image source={{ uri: produto.imagem }} style={styles.produtoImagem} />
                    ) : (
                      <Text style={styles.textoVazio}>Imagem não disponível</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 130,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topo: {
    alignItems: 'center',
  },
  etiqueta: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
    borderColor: '#FF9431',
    borderWidth: 1.4,
    marginLeft: 7,
    marginTop: 20,
  },
  textoEtiqueta: {
    color: '#0D0D0D',
    fontWeight: '600',
    padding: 1,
  },
  title1: {
    color: '#0D0D0D',
    fontSize: 22,
    letterSpacing: 1.2,
    fontWeight: 'bold',
  },
  title2: {
    color: '#0D0D0D',
    fontSize: 18,
    letterSpacing: 1.2,
    fontWeight: '650',
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 30,
  },
  iconWrapper: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FF9431',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  carousel: {
    marginLeft: 20,
  },
  textoVazio: {
    color: '#D3D3D3',
    textAlign: 'center',
    marginTop: 10,
  },
  produtoImagem: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },

  produtoContainer: {
    flexDirection: 'row', // Organiza os elementos na horizontal
    alignItems: 'center', // Alinha verticalmente
    justifyContent: 'space-between', // Mantém espaço entre texto e imagem
    padding: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  
  produtoInfo: {
    flex: 1, // Faz o texto ocupar o espaço restante
  },
  
  produtoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  produtoDescricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  
  produtoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9431',
    marginTop: 6,
  },
  
  produtoImagem: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 8,
    marginLeft: 10, // Dá um espaço entre o texto e a imagem
  },
  
  textoVazio: {
    color: '#D3D3D3',
    textAlign: 'center',
    marginTop: 10,
  },
  
});

