import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAnimais } from '../services/animaisStorage';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ListaAnimaisScreen({ navigation }) {
  const [animais, setAnimais] = useState([]);
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  useFocusEffect(
    useCallback(() => {
      carregarAnimais();
    }, [])
  );

  const carregarAnimais = async () => {
    const data = await getAnimais();
    setAnimais(data);
  };

  if (!georamaLoaded) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PerfilPet', { id: item.id })}>
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.foto} />
      ) : (
        <View style={styles.fotoPlaceholder}><Text>Sem Foto</Text></View>
      )}
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.texto}>{item.raca} - {item.idade} anos</Text>
        <Text style={styles.texto}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Animais</Text>
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  foto: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  fotoPlaceholder: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee',
    justifyContent: 'center', alignItems: 'center', marginRight: 10
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
  texto: { fontFamily: 'Georama_400Regular', fontSize: 14 },
});