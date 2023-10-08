import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './views/home';
import Login from './views/login';
import RecuperaSenha from './views/recuperaSenha';
import CadastraUsuario from './views/cadastraUsuario';
import HomeLojaScreen from '/views/homeLoja';
import MenuScreen from '/views/menu';
import DetalheItemScreen from './views/datelheItem';
import SacolaScreen from './views/sacola';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="RecuperaSenha" component={RecuperaSenha} options={{headerShown: false}} />
        <Stack.Screen name="CadastraUsuario" component={CadastraUsuario} options={{headerShown: false}} />
        <Stack.Screen name="HomeLoja" component={HomeLojaScreen} options={{headerShown: false}} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown: false}} />
        <Stack.Screen name="DetalheItem" component={DetalheItemScreen} options={{headerShown: false}} />
        <Stack.Screen name="Sacola" component={SacolaScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

