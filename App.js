import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// Importando telas
import HomeScreen from './views/home';
import Login from './views/login';
import CadastraUsuario from './views/cadastraUsuario';
import HomeLojaScreen from './views/homeLoja';
import MenuScreen from './views/menu';
import DetalheItemScreen from './views/detalheItem';
import SacolaScreen from './views/sacola';
import ConfirmaPedidoScreen from './views/messageScreens/confirmaPedido';
import ExitScreen from './views/messageScreens/exit';
import ConfirmaAlteracaoScreen from './views/messageScreens/confirmaAlteracao';
import FormEnderecoScreen from './views/formEndereco';
import FormContaScreen from './views/formConta';
import HistoricoScreen from './views/historico';
import SemPedidosScreen from './views/messageScreens/semPedidos';
import ResumoSacola from './views/resumoSacola';
import DetalhePedido from './views/detalhePedido';
import ListAddress from './views/listAddress';

const Stack = createNativeStackNavigator();

// Obtém o prefixo correto baseado no ambiente
const prefix = Linking.createURL('/');

// Configuração do Deep Linking
const linking = {
  prefixes: [
    "exp://192.168.1.211:8081", // Prefixo com IP da máquina local
    prefix, // Prefixo padrão do Expo
  ],
  config: {
    screens: {
      ConfirmaPedido: "confirma-pedido", // Deep linking para a tela ConfirmaPedido
    },
  },
};

export default function App() {
  useEffect(() => {
    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log("Deep Link recebido:", url);

      // Processar a URL recebida e navegar para a tela apropriada
      if (url) {
        const path = url.split("/").pop();
        if (path === "confirma-pedido") {
          // Aqui pode adicionar lógica para navegar programaticamente, caso necessário
          console.log('Navegar para ConfirmaPedido');
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Cleanup: Remover o listener quando o componente for desmontado
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CadastraUsuario" component={CadastraUsuario} options={{ headerShown: false }} />
        <Stack.Screen name="HomeLoja" component={HomeLojaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetalheItem" component={DetalheItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sacola" component={SacolaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmaPedido" component={ConfirmaPedidoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Exit" component={ExitScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmaAlteracao" component={ConfirmaAlteracaoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormEndereco" component={FormEnderecoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormConta" component={FormContaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Historico" component={HistoricoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SemPedidos" component={SemPedidosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResumoSacola" component={ResumoSacola} options={{ headerShown: false }} />
        <Stack.Screen name="DetalhePedido" component={DetalhePedido} options={{ headerShown: false }} />
        <Stack.Screen name="ListAddress" component={ListAddress} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
