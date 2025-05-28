import React from "react";
import { View, Text } from "react-native";
import { auth } from "../services/firebaseConfig";

export default function ProfileScreen() {
  const user = auth.currentUser;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Perfil do Usuário</Text>
      <Text>Email: {user?.email}</Text>
      <Text>ID: {user?.uid}</Text>
    </View>
  );
}