import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Item from '../components/item';
import Footer from '../components/footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/components/linkApi';

export default function HomeLoja({ navigation, route }) {
  const [empresa, setEmpresa] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState('');
  const [header, setHeader] = useState(null);

  useEffect(() => {
    fetchHeader();
  }, []);

  useEffect(() => {
    if (header) {
      fetchEmpresa();
      fetchCategorias();
      fetchProdutos();
    }
  }, [header]);

  const fetchHeader = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = route.params.id;
    setIdEmpresa(userId);
    setHeader({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchEmpresa = async () => {
    axios.get(`${API_URL}/api/empresa/${idEmpresa}`, header)
      .then(response => {
        setEmpresa(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchCategorias = async () => {
    axios.get(`${API_URL}/api/categoria-produto/empresa/${idEmpresa}`, header)
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchProdutos = async () => {
    axios.get(`${API_URL}/api/produto/categoria-empresa/${idEmpresa}`, header)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={empresa.imgCapa} style={styles.backgroundImage} />
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconWrapper}>
              <View style={styles.iconBackground}>
                <Image style={styles.icon} source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")} />
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.iconWrapper}>
                <View style={styles.iconBackground}>
                  <Image style={styles.icon} source={require("../assets/images/iconFooter/material-symbols--search-rounded.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.topo}>
            <Text style={[styles.title1, { marginTop: 20 }]}>{empresa.nome}</Text>
          </View>

          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
            {categorias.map((categoria, index) => (
              <TouchableOpacity key={index} style={styles.etiqueta}>
                <Text style={styles.textoEtiqueta}>{categoria.descricao}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {produtos.length === 0 ? (
            <Text style={styles.textoVazio}>Nenhum produto ainda</Text>
          ) : (
            produtos.map((produtosCategoria, indexCategoria) => (
              <View key={indexCategoria}>
                <Text style={styles.title2}>{produtosCategoria[0].categoria.descricao}</Text>
                {produtosCategoria.map((produto, indexProduto) => (
                  <TouchableOpacity key={indexProduto}>
                    <Item
                      titulo={produto.titulo}
                      descricao={produto.descricao}
                      preco={produto.preco}
                      imagem={produto.imagem}
                      onPress={() => navigation.navigate("DetalheItem", { produto, origin: 'HomeLoja' })}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
      {/* <Footer /> */}
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
  anuncioImage: {
    width: 340,
    height: 130,
    marginTop: 20,
    marginBottom: 35,
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
    fontWeight: '450',
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 30,
    fontWeight: '650',
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
    marginTop: '50%',
  }
});
