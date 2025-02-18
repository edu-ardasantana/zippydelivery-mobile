import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import Footer from "../components/footer"; 
import StatusTimeLine from "../components/statusTimeLine";

export default function DetalhePedido({ route, navigation }) {
  const { pedido } = route.params;

  const [statusAnimation] = useState(new Animated.Value(0));

  function calcularSubtotal(itensPedido) {
    return itensPedido.reduce(
      (subtotal, item) => subtotal + item.qtdProduto * item.preco,
      0
    );
  }

  function calcularTotal(itensPedido, taxaEntrega = 0) {
    const subtotal = calcularSubtotal(itensPedido);
    return subtotal + taxaEntrega;
  }

  function mapFormaPagamento(formaPagamento) {
    switch (formaPagamento) {
      case "PIX":
        return "PIX";
      case "VALE_ALIMENTACAO":
        return "Vale alimentação";
      case "DINHEIRO":
        return "Dinheiro";
      case "CARTAO_DEBITO":
        return "Cartão de débito";
      case "CARTAO_CREDITO":
        return "Cartão de crédito";
      default:
        return "Forma de pagamento desconhecida";
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Historico")}
          style={styles.iconWrapper}
        >
          <Image
            style={styles.icon}
            source={require("../assets/images/iconFooter/material-symbols--arrow-back-ios-new-rounded.png")}
          />
        </TouchableOpacity>

        <Text style={styles.titlePagina}>Detalhes do pedido</Text>
      </View>

      <Text style={styles.title}>
        {pedido.empresa?.nome || "Restaurante desconhecido"}
      </Text>
      <Text style={styles.info}>
        {pedido.statusPedido} • Nº {pedido.id}
      </Text>

      <StatusTimeLine id={pedido.id} />

      <ScrollView>
        {pedido.itens?.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image
              style={styles.itemImage}
              source={{ uri: item.imagem || "../assets/images/item.png" }}
            />

            <View style={styles.resumoPedido}>
              <Text style={styles.h1}>
                {item.descricao || "Produto desconhecido"}
              </Text>
              <Text style={styles.h1}>
                {item.qtdProduto} {item.qtdProduto === 1 ? "porção" : "porções"}
              </Text>
              <Text
                style={{
                  color: "#FF9431",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                {`R$ ${(item.qtdProduto * item.preco).toFixed(2)}`}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <View>
        <Text style={styles.h1}>Resumo de valores</Text>
      </View>

      <View style={styles.resumo}>
        <Text>Subtotal</Text>
        <Text>{`R$ ${calcularSubtotal(pedido.itens).toFixed(2)}`}</Text>
      </View>

      <View style={styles.resumo}>
        <Text>Taxa de entrega</Text>
        <Text>{`R$ ${pedido.taxaEntrega.toFixed(2) || "0.00"}`}</Text>
      </View>

      <View style={styles.resumo}>
        <Text style={{ fontWeight: "bold" }}>Total</Text>{" "}
        <Text style={{ fontWeight: "bold" }}>
          {pedido.valorTotal.toFixed(2) || "0.00"}
        </Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.pagamento}>
        <Text style={styles.h1}>Forma de pagamento</Text>

        <Text style={styles.blocoText}>{mapFormaPagamento(pedido.formaPagamento)}</Text>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
      </View>

      <View>
        <Text style={styles.h1}>Endereço de entrega</Text>
      </View>
      <View style={styles.bloco}>
        <Image
          style={styles.menuIcon}
          source={require("../assets/images/iconFooter/material-symbols--location-on-rounded.png")}
        />

        <Text style={styles.blocoText}>
          {pedido.enderecoEntrega.logradouro},{" "}
          {pedido.enderecoEntrega.bairro} -{" "}
          {pedido.enderecoEntrega.cep}
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Adicionar à sacola</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 100,
  },
  iconWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#FF9431",
  },
  titlePagina: {
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 15,
    color: "#FF9431",
    marginLeft: 60,
  },
  title: {
    marginTop: 20,
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  info: {
    paddingLeft: 10,
    color: "#4D585E",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 5,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 7,
    marginVertical: 10,
  },
  itemText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 10,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: "#FF9431",
  },
  bloco: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF9431",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  blocoText: {
    fontSize: 14,
    marginRight: 20
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#dbdbe7",
  },
  h1: {
    fontWeight: "bold",
    paddingHorizontal: 20,
    fontSize: 15,
  },
  pagamento: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 8,
  },
  logoCartao: {
    width: 35,
    height: 22,
    marginVertical: 20,
    marginHorizontal: 8,
  },
  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  resumoPedido: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
