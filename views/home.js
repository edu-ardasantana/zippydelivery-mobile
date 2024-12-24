import axios from 'axios';
import Loja from '../components/loja';
import Footer from '../components/footer';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route, navigation }) {

  const token = route.params?.token || '';
  const [empresas, setEmpresas] = useState([]);
  const [categoriasEmpresas, setCategoriasEmpresas] = useState([]);
  const [empresasFiltradasPorCategoria, setEmpresasFiltradasPorCategoria] = useState([])
  const [empresasFiltradasPorNome, setEmpresasFiltradasPorNome] = useState([])
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  const [endereco, setEndereco] = useState(null);
  const [id, setId] = useState(null);
  const [clienteLogado, setClienteLogado] = useState(null);
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState('');

  const banners = {
    1: require('../assets/images/banner1.png'),
    2: require('../assets/images/banner2.png'),
  };

  useEffect(() => {
    fetchCliente();
    fetchCategoriasEmpresas();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/empresa', { headers: { Authorization: `Bearer ${token}` }})
      .then(response => setEmpresas(response.data))
      .catch(error => console.error(error));
  }, []);

  const fetchCliente = async () => {
    let id = await AsyncStorage.getItem('id')
    setId(id);
    let url = `http://localhost:8080/api/cliente/user/${id}`;
    axios.get(url, { headers: { Authorization: `Bearer ${token}` }})
    .then(function (response) { 
      setClienteLogado(response.data)
      setEndereco(response.data.enderecos)

      const enderecoPadrao = response.data.enderecos.find(endereco => endereco.isPadrao);
      setEndereco(enderecoPadrao ? enderecoPadrao : null);

    })
    .catch(function (error) { console.error(error); });
  };

  const fetchCategoriasEmpresas = async () => {
    axios.get('http://localhost:8080/api/categoria-empresa')
      .then(function (response) { 
        const categorias = Array.isArray(response.data) ? response.data : [];
        setCategoriasEmpresas(prevCategorias => [...prevCategorias, ...categorias]);
      })
      .catch(function (error) { console.error(error); });
  };
  
  function filtarEmpresas(c) {
    setEmpresaSelecionada(c.descricao);
    setEmpresasFiltradasPorCategoria(empresas.filter((empresa) => empresa.categoria.descricao === c.descricao));
  }

  function todas() {
    setEmpresaSelecionada(null);
  }

  const handleSearch = () => {
    const filteredEmpresas = searchText === ''
      ? empresas
      : empresas.filter(empresa =>
          empresa.nome.toLowerCase().includes(searchText.toLowerCase())
        );
  
      setEmpresasFiltradasPorNome(filteredEmpresas);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Image style={[styles.menuIcon, { width: 20, height: 20 }]} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
        {endereco === null
          ? <Text style={styles.endereco} onPress={() => navigation.navigate('FormEndereco', { origin: 'Home' })} >Escolher endereço</Text>
          : <Text style={styles.endereco} onPress={() => navigation.navigate('ListAddress', { origin: 'Home' })} >{endereco.logradouro}, {endereco.cidade}</Text>
        }
        <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:keyboard-arrow-down-rounded.svg', }} />
      </TouchableOpacity>

      <ScrollView>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={[styles.carousel, { marginLeft: 17 }]}>
          {[1, 2].map((index) =>
            <View key={index} style={styles.banner}>
              <Image style={styles.anuncioImage} source={banners[index]} />
            </View>
          )}
        </ScrollView>

        <View style={styles.containerSearch}>
          <View style={styles.search}>
            <TextInput
              style={styles.input}
              placeholder="Busque lojas próximas"
              onChangeText={text => setSearchText(text)}
              value={searchText} />
            <TouchableOpacity onPress={handleSearch}>
              <Image style={[styles.icon, { marginRight: 10, tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg', }} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
          {
            empresaSelecionada == null
              ?
              <TouchableOpacity style={[styles.etiqueta, { backgroundColor: '#FF9431' }]}>
                <Text style={[styles.textoEtiqueta, { color: 'white' }]}>Todas</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.etiqueta} onPress={() => todas()}>
                <Text style={styles.textoEtiqueta}>Todas</Text>
              </TouchableOpacity>
          }
          {
            categoriasEmpresas.map((c, index) => (
              <TouchableOpacity key={index} onPress={() => filtarEmpresas(c)} style={[styles.etiqueta, empresaSelecionada === c.descricao && { backgroundColor: '#FF9431' }]}>
                <Text style={[styles.textoEtiqueta, empresaSelecionada === c.descricao && { color: 'white' }]}>{c.descricao}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        <Text style={styles.title2}>Lojas</Text>
        {
          (empresaSelecionada === null || empresasFiltradasPorCategoria.length <= 0) &&
          (empresasFiltradasPorNome.length > 0 ? (
            empresasFiltradasPorNome.map((empresa, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
                <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
              </TouchableOpacity>
            ))
          ) : (
            empresas.map((empresa, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
                <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
              </TouchableOpacity>
            ))
          ))
        }
        {
          empresaSelecionada !== null && empresasFiltradasPorCategoria.length > 0 && empresasFiltradasPorCategoria.map((empresa, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
              <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 2,
    marginHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    justifyContent: 'space-between',
  },
  cadaRestaurante: {
    flex: 4,
    height: 100,
    flexDirection: 'row',
  },
  iconWrapper: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ABABAB',
  },
  text: {
    color: '#7C7C8A',
    fontSize: 12,
    fontWeight: '400',
  },
  lojaImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical: 10,
    marginRight: 7,
  },
  nomeItem: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#FF9431',
    marginVertical: 30,
    marginHorizontal: 15,
  },
  logo: {
    width: '30%',
    height: '75%',
  },
  endereco: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '600',
  },
  anuncioImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginRight: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  containerSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderColor: '#E6E6E6',
    borderWidth: 1.4,
    marginBottom: 10,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    placeholderTextColor: '#7C7C8A',
    color: '#7C7C8A',
  },
  etiqueta: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
    borderColor: '#FF9431',
    borderWidth: 1.4,
    marginLeft: 7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoEtiqueta: {
    color: '#0D0D0D',
    fontWeight: 500,
  },
  logoLoja: {
    width: 50,
    height: 50,
    marginRight: 20,
    marginLeft: 10,
  },
  infoLoja: {
    flexDirection: 'row',
    marginTop: 7,
  },
  infoLojaTime: {
    color: '#E1E1E6',
    fontSize: 14,
    fontWeight: '350',
  },
  infoLojaStatus: {
    color: '#82F3FF',
    fontSize: 14,
    fontWeight: '450',
  },
  nomeLoja: {
    color: '#E1E1E6',
    fontSize: 14,
    fontWeight: '350',
  },
  title2: {
    color: '#0D1D25',
    fontSize: 17,
    fontWeight: 500,
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  carousel: {
    marginLeft: 10,
  },
});