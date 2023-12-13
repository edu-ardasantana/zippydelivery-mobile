import axios from 'axios';
import Loja from './component/loja';
import Footer from './component/footer';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home({ navigation }) {

  localStorage.setItem("var", "home");

  const userId = parseInt(localStorage.getItem('id'));
  const isFocused = useIsFocused();

  const [categoriasEmpresas, setCategoriasEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/categoriaempresa')
      .then(function (response) { return setCategoriasEmpresas(...categoriasEmpresas, response.data); })
      .catch(function (error) { console.log(error); });
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8080/api/empresa')
      .then(function (response) { return setEmpresas(response.data); })
      .catch(function (error) { console.log(error); });
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cliente/user/${userId}`)
      .then(function (response) {
        const data = response.data;
        setCidade(data.cidade);
        setEstado(data.estado);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isFocused])

  let endereco = cidade == null ? null : `${cidade}, ${estado}`;

  const handleSearch = () => {
    const filteredEmpresas = searchText === ''
      ? empresas
      : empresas.filter(empresa =>
          empresa.nome.toLowerCase().includes(searchText.toLowerCase())
        );
  
    setEmpresasFiltradas(filteredEmpresas);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('FormEndereco', { origin: 'Home' })} >
        <Image style={[styles.menuIcon, { width: 20, height: 20 }]} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
        {endereco === null
          ? <Text style={styles.endereco}>Escolher endereço</Text>
          : <Text style={styles.endereco}>{endereco}</Text>
        }
        <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:keyboard-arrow-down-rounded.svg', }} />
      </TouchableOpacity>

      <ScrollView>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={[styles.carousel, { marginLeft: 17 }]}>
          {[1, 2].map((index) =>
            <View key={index} style={styles.banner}>
              <Image style={styles.anuncioImage} source={require(`/views/img/banner${index}.png`)} />
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
          {categoriasEmpresas.map((c, index) =>
            <TouchableOpacity style={styles.etiqueta}>
              <Text style={styles.textoEtiqueta}>{c.descricao}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Text style={styles.title2}>Lojas</Text>
        {empresasFiltradas.length !== 0 ? (
          empresasFiltradas.map((empresa, index) => (
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
        )}
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