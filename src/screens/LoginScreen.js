import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { Image, TouchableOpacity } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "773991145084-nr4j7k1r9oikbijq2bt1b8u27uvsjvqs.apps.googleusercontent.com",
    iosClientId: "773991145084-nr4j7k1r9oikbijq2bt1b8u27uvsjvqs.apps.googleusercontent.com",
    androidClientId: "773991145084-q4c32hde7aeabeegkrpjlmob51ud8mba.apps.googleusercontent.com",
    webClientId: "773991145084-nr4j7k1r9oikbijq2bt1b8u27uvsjvqs.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { idToken, accessToken } = response.authentication;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Usuário logado:", userCredential.user);
        })
        .catch((error) => {
          console.error("Erro ao logar com credential:", error);
        });
    }
  }, [response]);

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("AppTabs");
    } catch (error) {
      let mensagem = "Erro desconhecido.";
      if (error.code === "auth/invalid-email") mensagem = "Email inválido.";
      if (error.code === "auth/user-not-found") mensagem = "Usuário não encontrado.";
      if (error.code === "auth/wrong-password") mensagem = "Senha incorreta.";
      Alert.alert("Erro ao logar", mensagem);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Faça o login para acessar o app</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#0578F9' }]} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#009C53' }]} onPress={loginEmail}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

       <Text style={styles.texto}>OU</Text>
      
      <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
        <Image
          source={require('../../assets/botaoGoogle.png')}
          style={{ height: 40, resizeMode: 'contain', marginTop: 20 }}
        />
      </TouchableOpacity>

  
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 20,
  },
  texto: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  input: {
    height: 60,
    backgroundColor: "#D9D9D9",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 10,
    width: 300,
  },
  logo: {
    height: 100,
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: 240,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#F3F3F3',
    fontWeight: 'bold',
  },
});