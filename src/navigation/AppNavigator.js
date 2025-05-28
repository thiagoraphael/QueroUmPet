import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.log("Erro ao carregar usuário local:", e);
      }
    };

    loadUserFromStorage();

    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      setUser(userAuth);

      if (userAuth) {
        await AsyncStorage.setItem('@user', JSON.stringify(userAuth));
      } else {
        await AsyncStorage.removeItem('@user');
      }
    });

    return unsubscribe;
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
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