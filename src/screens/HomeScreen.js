import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getAnimais } from "../services/animaisStorage";
import { getFinancas } from "../services/financasStorage";
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();  // ✅ Agora no topo!

  const [animais, setAnimais] = useState([]);
  const [financas, setFinancas] = useState([]);

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const listaAnimais = await getAnimais();
    const listaFinancas = await getFinancas();
    setAnimais(listaAnimais);
    setFinancas(listaFinancas);
  };

  const fazerLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('@user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const totalAnimais = animais.length;
  const totalAdotados = animais.filter(a => a.status === "Adotado").length;
  const saldoAtual = financas.reduce((total, item) => {
    return item.tipo === "Entrada" ? total + Number(item.valor) : total - Number(item.valor);
  }, 0);
  const ultimasFinancas = [...financas].slice(-3).reverse();
  const ultimosAdotados = animais.filter(a => a.status === "Adotado").slice(-3).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Quero Um Pet</Text>

      {/* PETs */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>🐶 PETs</Text>
        <Text style={styles.texto}>Total cadastrados: {totalAnimais}</Text>
        <Text style={styles.texto}>Total adotados: {totalAdotados}</Text>
      </View>

      {/* Financeiro */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>💰 Financeiro</Text>
        <Text style={styles.texto}>Saldo atual: R$ {saldoAtual.toFixed(2)}</Text>
        <Text style={styles.subtitulo}>Últimas movimentações:</Text>
        {ultimasFinancas.length === 0 ? (
          <Text style={styles.texto}>Nenhuma movimentação ainda.</Text>
        ) : (
          ultimasFinancas.map((item) => (
            <Text key={item.id} style={styles.texto}>
              {item.tipo}: R$ {Number(item.valor).toFixed(2)} - {item.descricao || 'Sem descrição'}
            </Text>
          ))
        )}
      </View>

      {/* Últimos Adotados */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>🏡 Últimos PETs Adotados</Text>
        {ultimosAdotados.length === 0 ? (
          <Text style={styles.texto}>Nenhum PET foi adotado ainda.</Text>
        ) : (
          ultimosAdotados.map((item) => (
            <View key={item.id} style={styles.petItem}>
              {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.petFoto} />
              ) : (
                <View style={styles.petFotoPlaceholder}>
                  <Text style={styles.texto}>Sem Foto</Text>
                </View>
              )}
              <View>
                <Text style={styles.texto}>{item.nome} - {item.raca}</Text>
                <Text style={styles.texto}>Idade: {item.idade} anos</Text>
                <Text style={styles.texto}>Adotante: {item.adotante ? item.adotante : 'Não informado'}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.botaoSair} onPress={fazerLogout}>
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontFamily: 'Barriecito_400Regular',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    color: '#0578F9',
  },
  botaoSair: {
    backgroundColor: '#c62828',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  cardTitulo: {
    fontFamily: 'Barriecito_400Regular',
    fontSize: 22,
    marginBottom: 8,
    color: '#333',
  },
  subtitulo: {
    fontFamily: 'Georama_400Regular',
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  texto: {
    fontFamily: 'Georama_400Regular',
    fontSize: 14,
    color: '#555',
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  petFoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  petFotoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});