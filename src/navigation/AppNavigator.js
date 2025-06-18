import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AnimaisScreen from "../screens/AnimaisScreen";
import FinancasScreen from "../screens/FinancasScreen";
import AdocoesScreen from "../screens/AdocoesScreen";
import CadastroAnimalScreen from "../screens/CadastroAnimalScreen";
import ListaAnimaisScreen from "../screens/ListaAnimaisScreen";
import NovaSaidaScreen from "../screens/NovaSaidaScreen"
import NovaEntradaScreen from "../screens/NovaEntradaScreen"
import ListaAdotadosScreen from "../screens/ListaAdotadosScreen";
import PerfilPetScreen from "../screens/PerfilPetScreen";

import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === 'Home') iconSource = require('../../assets/icons/home.png');
          else if (route.name === 'Animais') iconSource = require('../../assets/icons/animais.png');
          else if (route.name === 'Finanças') iconSource = require('../../assets/icons/financas.png');
          else if (route.name === 'Adoções') iconSource = require('../../assets/icons/adocoes.png');

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FFFFFF' : '#D9D9D9',
              }}
              resizeMode="contain"
            />
          );
        },
        headerShown: false,
         tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#D9D9D9',
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 60,
          right: 60,
          height: 60,
          backgroundColor: '#0578F9',
          borderRadius: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Animais" component={AnimaisScreen} />
      <Tab.Screen name="Finanças" component={FinancasScreen} />
      <Tab.Screen name="Adoções" component={AdocoesScreen} />
    </Tab.Navigator>
  );
}

// Stack principal
export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) setUser(JSON.parse(userData));
      } catch (e) {
        console.log("Erro ao carregar usuário local:", e);
      }
    };

    loadUserFromStorage();

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      setUser(userAuth);
      if (userAuth) await AsyncStorage.setItem('@user', JSON.stringify(userAuth));
      else await AsyncStorage.removeItem('@user');
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="CadastroAnimal" component={CadastroAnimalScreen} />
            <Stack.Screen name="ListaAnimais" component={ListaAnimaisScreen} />
            <Stack.Screen name="NovaEntrada" component={NovaEntradaScreen} />
            <Stack.Screen name="NovaSaida" component={NovaSaidaScreen} />
            <Stack.Screen name="ListaAdotados" component={ListaAdotadosScreen} />
            <Stack.Screen name="PerfilPet" component={PerfilPetScreen} />
            
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}