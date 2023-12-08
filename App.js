import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/home';
import Login from './views/login';
import CadastraUsuario from './views/cadastraUsuario';
import HomeLojaScreen from '/views/homeLoja';
import MenuScreen from '/views/menu';
import DetalheItemScreen from './views/detalheItem';
import SacolaScreen from './views/sacola';
import ConfirmaPedidoScreen from './views/messageScreens/confirmaPedido';
import ConfirmaAlteracaoScreen from './views/messageScreens/confirmaAlteracao';
import ExitScreen from './views/messageScreens/exit';
import FormEnderecoScreen from './views/formEndereco';
import FormContaScreen from './views/formConta';
import HistoricoScreen from './views/historico';
import SemPedidosScreen from './views/messageScreens/semPedidos';
import ResumoSacola from './views/resumoSacola';
import DetalhePedido from './views/detalhePedido';
import { MyProvider } from './views/myContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MyProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="CadastraUsuario" component={CadastraUsuario} options={{headerShown: false}} />
        <Stack.Screen name="HomeLoja" component={HomeLojaScreen} options={{headerShown: false}} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown: false}} />
        <Stack.Screen name="DetalheItem" component={DetalheItemScreen} options={{headerShown: false}} />
        <Stack.Screen name="Sacola" component={SacolaScreen} options={{headerShown: false}} />
        <Stack.Screen name="ConfirmaPedido" component={ConfirmaPedidoScreen} options={{headerShown: false}} />
        <Stack.Screen name="Exit" component={ExitScreen} options={{headerShown: false}} />
        <Stack.Screen name="ConfirmaAlteracao" component={ConfirmaAlteracaoScreen} options={{headerShown: false}} />
        <Stack.Screen name="FormEndereco" component={FormEnderecoScreen} options={{headerShown: false}} />
        <Stack.Screen name="FormConta" component={FormContaScreen} options={{headerShown: false}} />
        <Stack.Screen name="Historico" component={HistoricoScreen} options={{headerShown: false}} />
        <Stack.Screen name="SemPedidos" component={SemPedidosScreen} options={{headerShown: false}} />
        <Stack.Screen name="ResumoSacola" component={ResumoSacola} options={{headerShown: false}} />
        <Stack.Screen name="DetalhePedido" component={DetalhePedido} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </MyProvider>
  );
}