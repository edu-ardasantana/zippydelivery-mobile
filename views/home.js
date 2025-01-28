import axios from 'axios';
import Loja from '../components/loja';
import Footer from '../components/footer';
import FooterEntregador from '../components/footerEntregador';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../components/linkApi";

export default function Home({ route, navigation }) {
  const [token, setToken] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [categoriasEmpresas, setCategoriasEmpresas] = useState([]);
  const [empresasFiltradasPorCategoria, setEmpresasFiltradasPorCategoria] = useState([]);
  const [empresasFiltradasPorNome, setEmpresasFiltradasPorNome] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [id, setId] = useState(null);
  const [clienteLogado, setClienteLogado] = useState(null);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();

  const banners = {
    1: require('../assets/images/banner1.png'),
    2: require('../assets/images/banner2.png'),
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    fetchToken(); // Carrega o token
  }, []);

  useEffect(() => {
    if (token) {
      fetchCliente();
      fetchCategoriasEmpresas();
      fetchEmpresas();
    }
  }, [token]); // Reexecuta quando o token for atualizado

  const fetchCliente = async () => {
    const storedId = await AsyncStorage.getItem('id');
    setId(storedId);

    const url = `${API_URL}/api/cliente/user/${storedId}`;
    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setClienteLogado(response.data);
      const enderecoPadrao = response.data.enderecos.find(end => end.padraoParaEntrega);
      setEndereco(enderecoPadrao || null);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoriasEmpresas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categoria-empresa`);
      setCategoriasEmpresas(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/empresa`, { headers: { Authorization: `Bearer ${token}` } });
      setEmpresas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const filteredEmpresas = searchText
      ? empresas.filter(empresa =>
        empresa.nome.toLowerCase().includes(searchText.toLowerCase())
      )
      : empresas;
    setEmpresasFiltradasPorNome(filteredEmpresas);
  };

  const toTitleCase = (text) => {
    return text
      ? text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
  };

  const filtarEmpresas = (categoria) => {
    setEmpresaSelecionada(categoria.descricao);
    setEmpresasFiltradasPorCategoria(empresas.filter(empresa => empresa.categoria.descricao === categoria.descricao));
  };

  const todas = () => {
    setEmpresaSelecionada(null);
    setEmpresasFiltradasPorCategoria([]);
  };


  const entregas = [
    { id: '1', titulo: 'Império dos Churros #145', endereco: 'Rua Macaubal, 3000 - Eldorado, São José do Rio Preto, SP, 15043485' },
    { id: '2', titulo: 'Império dos Churros #145', endereco: 'Rua Macaubal, 3000 - Eldorado, São José do Rio Preto, SP, 15043485' },
    { id: '3', titulo: 'Império dos Churros #145', endereco: 'Rua Macaubal, 3000 - Eldorado, São José do Rio Preto, SP, 15043485' },
  ];

  if (clienteLogado) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.header}>
          <Image style={[styles.menuIcon, { width: 20, height: 20 }]} source={{ uri: 'https://api.iconify.design/material-symbols:location-on-rounded.svg' }} />
          {endereco === null
            ? <Text style={styles.endereco} onPress={() => navigation.navigate('FormEndereco', { origin: 'Home' })}>Escolher endereço</Text>
            : <Text style={styles.endereco} onPress={() => navigation.navigate('ListAddress', { origin: 'Home' })}>{toTitleCase(endereco.logradouro)}, {toTitleCase(endereco.cidade)}</Text>
          }
          <Image style={styles.menuIcon} source={{ uri: 'https://api.iconify.design/material-symbols:keyboard-arrow-down-rounded.svg' }} />
        </TouchableOpacity>

        <ScrollView>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
            {[1, 2].map((index) => (
              <View key={index} style={styles.banner}>
                <Image style={styles.anuncioImage} source={banners[index]} />
              </View>
            ))}
          </ScrollView>

          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <TextInput
                style={styles.input}
                placeholder="Busque lojas próximas"
                onChangeText={setSearchText}
                value={searchText}
              />
              <TouchableOpacity onPress={handleSearch}>
                <Image style={[styles.icon, { marginRight: 10, tintColor: '#FF9431' }]} source={{ uri: 'https://api.iconify.design/material-symbols:search-rounded.svg' }} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer} style={styles.carousel}>
            <TouchableOpacity style={[styles.etiqueta, empresaSelecionada === null && { backgroundColor: '#FF9431' }]} onPress={todas}>
              <Text style={[styles.textoEtiqueta, empresaSelecionada === null && { color: 'white' }]}>Todas</Text>
            </TouchableOpacity>
            {categoriasEmpresas.map((c, index) => (
              <TouchableOpacity key={c.id} onPress={() => filtarEmpresas(c)} style={[styles.etiqueta, empresaSelecionada === c.descricao && { backgroundColor: '#FF9431' }]}>
                <Text style={[styles.textoEtiqueta, empresaSelecionada === c.descricao && { color: 'white' }]}>{c.descricao}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.title2}>Lojas</Text>
          {empresaSelecionada === null
            ? empresasFiltradasPorNome.length > 0
              ? empresasFiltradasPorNome.map((empresa, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
                  <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
                </TouchableOpacity>
              ))
              : empresas.map((empresa, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
                  <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
                </TouchableOpacity>
              ))
            : empresasFiltradasPorCategoria.map((empresa, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('HomeLoja', { id: empresa.id })} style={styles.cadaRestaurante}>
                <Loja categoria={empresa.categoria.descricao} nome={empresa.nome} taxaFrete={empresa.taxaFrete} imgPerfil={empresa.imgPerfil} tempoEntrega={empresa.tempoEntrega} />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <Footer />
      </View>
    );

  } else {
    return (

      <ScrollView contentContainerStyle={styles.container} >
        <View style={styles.headerContent}>
          <View style={styles.infoUsuario}>
            <Image source={{ uri: 'https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=_XeYoSJQIN7GrE08cUQDJCo3U7yvoEp5OKpbhQzpmC0=' }} style={styles.avatar} />
            <View>
              <Text style={styles.nomeUsuario}>Abinadabe</Text>
              <Text style={styles.statusUsuario}>zippy a 2 meses</Text>
            </View>
          </View>
          <Image source={require('../assets/images/LogoNovo.png')} style={styles.logoZippy} />
        </View>

        <View>
          <View style={styles.estatisticasConteiner}>

            <View style={styles.estatisticas}>
              <View style={styles.blocoEstatistica}>
                <Text style={styles.labelEstatistica}>Ganhos do dia</Text>
                <Text style={{ fontWeight: 'bold', color: "black", fontSize: 20 }}>R$ 0,00</Text>
                <Text style={styles.labelEstatistica}>Saldo mensal: <Text style={{ fontWeight: 'bold', color: "black" }}>R$ 373,12</Text></Text>
              </View>

              <View style={styles.blocoEstatistica}>
                <View style={styles.linhaEstatistica}>
                  <Text style={styles.labelEstatistica}>Aceitas</Text>
                  <Text style={styles.valorEstatistica}>23</Text>
                </View>
                <View style={styles.linhaEstatistica}>
                  <Text style={styles.labelEstatistica}>Finalizadas</Text>
                  <Text style={styles.valorEstatistica}>20</Text>
                </View>
                <View style={styles.linhaEstatistica}>
                  <Text style={styles.labelEstatistica}>Recusadas</Text>
                  <Text style={styles.valorEstatistica}>2</Text>
                </View>
              </View>
            </View>

            <Image source={require('../assets/images/image.png')} style={styles.imagemMapa} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ComeceAEntregar')} style={styles.botaoEntregar}>
            <Text style={styles.textoBotaoEntregar}>Comece a entregar</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.entregasContainer}>
          <Text style={styles.tituloSecao}>Minhas entregas</Text>
          <FlatList
            data={entregas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (

              <View style={styles.itemEntrega}>
                <Image style={styles.icon} source={require('../assets/images/iconFooter/diagonal_line.png')} />
                <View style={styles.detalhesEntrega}>
                  <Text style={styles.tituloEntrega}>{item.titulo}</Text>
                  <Text style={styles.enderecoEntrega}>{item.endereco}</Text>
                </View>
                <TouchableOpacity
                // onPress={() => navigation.navigate('')}
                >
                  <Image style={styles.icon} source={require('../assets/images/iconFooter/chevron_right_24dp_4D585E_FILL0_wght400_GRAD0_opsz24.png')} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <FooterEntregador />
      </ScrollView>
    );
  }

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

  //Entregador
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingRight: 30,
    backgroundColor: '#FFF',
  },
  infoUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusUsuario: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  logoZippy: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  estatisticasConteiner: {
    position: 'relative',
  },
  estatisticas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    gap: 10,
    position: 'absolute',
    top: -30,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  blocoEstatistica: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,

  },
  linhaEstatistica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  valorEstatistica: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  labelEstatistica: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  imagemMapa: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginTop: 40,
  },
  botaoEntregar: {
    backgroundColor: '#FF9431',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5,
    width: '80%',
    position: 'absolute',
    bottom: -40,
    zIndex: 1,
  },
  textoBotaoEntregar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  entregasContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flex: 1,
    marginVertical: 50
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemEntrega: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  detalhesEntrega: {
    flex: 1,
  },
  tituloEntrega: {
    fontSize: 16,
    color: '#7D7D7D',
    fontWeight: 'bold',
    
  },
  enderecoEntrega: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  iconeEntrega: {
    fontSize: 18,
    color: '#FFA500',
  },
});