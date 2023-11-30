import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from './component/footer';
import Loja from './component/loja'
import axios from 'axios';

export default function Home({ route, navigation }) {

  localStorage.setItem("var", "home");

  const listagemEtiquetas = [1, 2, 3, 4, 5, 6];

  const id = window.localStorage.getItem("id");

  const [empresas, setEmpresas] = useState([]);
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    axios.get('http://localhost:8080/api/empresa')
      .then(function (response) {
        return setEmpresas(...empresas, response.data);
      }).catch(function (error) {
        console.log(error);
      });

  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cliente/findByUser/${id}`)
      .then(function (response) {
        const data = response.data;
        setCidade(data.cidade);
        setEstado(data.estado);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error)
      });
  }, [isFocused])

  let endereco;

  if (cidade == null || cidade == "") {
    endereco = null;
  } else {
    endereco = `${cidade}, ${estado}`
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('FormEndereco')} >
        <Image style={[styles.menuIcon, { width: 20, height: 20 }]} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
        {endereco == null 
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
            <TextInput style={styles.input} placeholder="Busque por pratos ou ingredientes" />
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image style={[styles.icon, { marginRight: 10, tintColor: '#FF9431', }]} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg', }} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
          {listagemEtiquetas.map((index) =>
            index === 1 ? (
              <TouchableOpacity key={index} style={[styles.etiqueta, { backgroundColor: '#FF9431' }]}              >
                <Text style={[styles.textoEtiqueta, { color: 'white' }]}>Etiqueta {index}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.etiqueta}>
                <Text style={styles.textoEtiqueta}>Etiqueta {index}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {empresas.map((l, i) => {

          return <Loja key={i} categoria={l.categoria.descricao} nome={l.nome} taxaFrete={l.taxaFrete} imagem={l.imgPerfil} />
        })}

      </ScrollView>
      <Footer />
    </View>

  );
}

const styles = StyleSheet.create({
  cadaRestaurante: {
    flex: 1.6,
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ABABAB',
  },
  lojaImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginVertical: 10,
    marginRight: 7,
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
  endereco: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '600',
  },
  anuncioImage: {
    width: 300,
    height: 150,
    marginBottom: 25,
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
    marginBottom: 10,
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
    marginTop: 20,
  },
  textoEtiqueta: {
    color: '#0D0D0D',
    fontWeight: '600',
    padding: 1,
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
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  carousel: {
    marginLeft: 10,
  },
});
