import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from './component/footer';
import Loja from './component/loja'
import axios from 'axios';

export default function Home({ navigation }) {

  const listagemLojas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const listagemEtiquetas = [1, 2, 3, 4, 5, 6];

  const [empresas, setEmpresas] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:8080/api/empresa')
      .then(function (response) {
        return setEmpresas(...empresas, response.data);
       
      }).catch(function (error) {
        console.log(error);

      });
  }, [])

 
 

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Menu')} >
        <Image style={[styles.menuIcon, { width: 20, height: 20 }]} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg', }} />
        <Text style={styles.endereco}>Camaragibe, PE</Text>
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

          return <Loja key={i} categoria={l.categoria} nome={l.nome} taxaFrete={l.taxaFrete} imagem={l.imgPerfil}/>
        })}

        {/* /*<Text style={styles.title2}>Lojas</Text>
        <View style={styles.cards}>
          {listagemLojas.map((index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeLoja')}>
                <Loja />
              </TouchableOpacity>
            </View>
          ))}
        </View> */}

      </ScrollView>
      <Footer />
    </View>

  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    marginHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    justifyContent: 'space-between',
},
colum1: {
    flex: 1.2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
},
colum2: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
},
colum3: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
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
