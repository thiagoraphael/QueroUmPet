import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '',
    webClientId:  '',
    iosClientId:  '',
    androidClientId: '',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
      })
        .then(res => res.json())
        .then(data => setUserInfo(data));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={require('./assets/pets.png')}
        style={styles.pets}
        resizeMode="contain"
      />

      <Text style={styles.title}>Faça o login para acessar o app</Text>

      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        style={styles.googleButton}
      >
        <Image
          source={require('./assets/google-logo.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Login com Google</Text>
      </TouchableOpacity>

      {userInfo && (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text style={styles.name}>Bem-vindo, {userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 100,
    marginBottom: 20,
  },
  pets: {
    marginBottom: 30,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  userInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCC535',
  },
  email: {
    fontSize: 14,
    color: '#FFF',
  },
});