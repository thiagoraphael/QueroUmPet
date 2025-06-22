import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getAnimais } from '../services/animaisStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function AdocoesScreen({ navigation }) {
  const [animais, setAnimais] = useState([]);
  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  useFocusEffect(
    useCallback(() => {
      carregarAnimais();
    }, [])
  );

  const carregarAnimais = async () => {
    const data = await getAnimais();
    setAnimais(data.filter(a => a.status === 'Adotado'));
  };

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const ultimosAdotados = [...animais].slice(-3).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adoções</Text>
      <Text style={styles.texto}>Total de PETs adotados: {animais.length}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ListaAdotados')}>
        <Text style={styles.botaoTexto}>Listar PETs Adotados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ListaAnimais')}>
        <Text style={styles.botaoTexto}>Cadastrar Adotante</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Últimos PETs Adotados:</Text>
      <FlatList
        data={ultimosAdotados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>{item.nome} - {item.raca} - {item.idade} anos</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontFamily: 'Barriecito_400Regular', fontSize: 26, color: '#0578F9', marginBottom: 10 },
  subtitulo: { fontFamily: 'Georama_400Regular', fontSize: 18, marginTop: 20, marginBottom: 10 },
  texto: { fontFamily: 'Georama_400Regular', fontSize: 16 },
  botao: {
    backgroundColor: '#0578F9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});