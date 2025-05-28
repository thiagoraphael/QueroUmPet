import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../services/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo!</Text>
      <Button title="Ver Perfil" onPress={() => navigation.navigate("Perfil")} />
      <Button
        title="Sair"
        onPress={async () => {
          await AsyncStorage.removeItem('@user');
          await signOut(auth);
        }}
      />
    </View>
  );
}