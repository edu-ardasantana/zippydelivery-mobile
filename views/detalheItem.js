import React, { useState } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


export default function DetalheItem({ navigation }) {



  const [quantity, setQuantity] = useState(1);

  function incrementQuantity() {
    setQuantity(quantity + 1);
  }

  function decrementQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function formatarMoeda(dataParam) {
    return dataParam ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/item.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeLoja')} style={styles.iconWrapper}>
            <View style={styles.iconBackground}>
              <Image style={styles.icon} source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent1}>
          <Text style={[styles.title1, { marginTop: 30 }]}>Salada Ravanello</Text>
          <Text style={styles.descricao}>Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.</Text>
          <Text style={[styles.title2, { color: '#FF9431', marginVertical: 15}]}>{formatarMoeda(44.90)}</Text>
        </View>

        <View style={styles.bodyContent2}>
          <View style={styles.box}>
            <Image style={styles.iconP} source={require("../assets/images/iconFooter/material-symbols--restaurant.png")} />
            <Text style={styles.title3}>Nome do Restaurante</Text>
          </View>
          <Text style={styles.text}>40-50 min • Categoria • <Text style={{ color: '#FF9431' }}>Grátis</Text></Text>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.bodyContent3}>
          <View style={styles.headerBodyContent3}>
            <Image style={[styles.iconP, { tintColor: '#4D585E' }]} source={require("../assets/images/iconFooter/flowbite--edit-outline.png")} />
            <Text style={[styles.title3, { color: '#4D585E' }]}>Alguma observação?</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ex: tirar cebola, maionese à parte, ponto de carne etc"
            placeholderTextColor="#999"
            multiline={true}
          />
        </View>

        <View style={styles.line4}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.button}>
            <Image
              style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]}
              source={require("../assets/images/iconFooter/material-symbols--remove-rounded.png")}
            />
          </TouchableOpacity>
          <Text style={styles.title2}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.button}>
            <Image
              style={[styles.icon, { width: 30, tintColor: '#0D0D0D' }]}
              source={require("../assets/images/iconFooter/material-symbols--add-rounded.png")}
            />
          </TouchableOpacity>
          <Button
            style={styles.buttonContainer}
            title="Adicionar"
            buttonStyle={styles.addButton}
            titleStyle={styles.addButtonTitle}
            onPress={() => navigation.navigate('Sacola')}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    width: 20,
    height: 20,
    tintColor: '#FF9431',
  },
  iconP: {
    width: 15,
    height: 15,
    tintColor: '#0D0D0D',
  },
  iconBackground: {
    backgroundColor: 'rgba(255, 250, 241, 0.9)',
    borderRadius: 999,
    padding: 5,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContent1: {
    paddingHorizontal: 40,
  },
  bodyContent2: {
    height: 70,
    width: '90%',
    borderRadius: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1.4,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingTop: 10,
    marginTop: 20,
  },
  bodyContent3: {
    height: 100,
    width: '90%',
    marginVertical: 20,
  },
  headerBodyContent3: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 7,
  },
  box: {
    height: '40%',
    width: '90%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    margin: 20,
  },
  title1: {
    color: '#0D0D0D',
    fontSize: 22,
    letterSpacing: 1.2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    color: '#FF9431',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title3: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  descricao: {
    color: '#7C7C8A',
    fontSize: 16,
    fontWeight: '400',
  },
  text: {
    color: '#7C7C8A',
    fontSize: 12,
    fontWeight: '400',
    padding: 10,
    letterSpacing: 1.2,
  },
  input: {
    height: 120,
    paddingHorizontal: 10,
    placeholderTextColor: '#ABABAB',
    color: '#ABABAB',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 5,
  },
  line4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 40,
    width: '90%', // Ajusta largura para centralizar os itens no conteúdo
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  addButton: {
    backgroundColor: '#FF9431',
    width: 140, // Ajuste de largura
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
  },
  addButtonTitle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
