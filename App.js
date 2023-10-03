import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '/views/home';
import HomeLojaScreen from '/views/homeLoja';
import Menu from '/views/menu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="HomeLoja" component={HomeLojaScreen} options={{headerShown: false}} />
        <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

