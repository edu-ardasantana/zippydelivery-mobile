import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';


export default function HomeLoja({ navigation }) {
  return (
    <View style={styles.container}>

      <ImageBackground style={styles.header} source={{ uri: 'https://imagens1.ne10.uol.com.br/blogsne10/social1/uploads/2014/03/boie-e-brasa.jpg' }} >

        <TouchableOpacity>
          <Image
            style={styles.menuIcon}
            source={{
              uri: 'https://api.iconify.design/material-symbols:menu-rounded.svg',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView >
        <View style={styles.bodyContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.carouselContainer}
            style={styles.scrollView} // Estilo adicional
          >
            {/* Conteúdo do carrossel */}
            <View style={styles.slide}>
              <Text>Slide 1</Text>
            </View>
            <View style={styles.slide}>
              <Text>Slide 2</Text>
            </View>
            <View style={styles.slide}>
              <Text>Slide 3</Text>
            </View>
          </ScrollView>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000A0F',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#000',
    borderRadius: 50,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: 300, // Defina a largura do ScrollView
    height: 200, // Defina a altura do ScrollView
    backgroundColor: 'lightgray', // Cor de fundo para visualização
    borderWidth: 2, // Adicione bordas para visualização
    borderColor: 'gray', // Cor das bordas
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slide: {
    width: 300, // Largura de cada slide
    height: 200, // Altura de cada slide
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    marginHorizontal: 10, // Espaçamento horizontal entre os slides
    borderRadius: 10, // Borda arredondada para os slides
  },
});
