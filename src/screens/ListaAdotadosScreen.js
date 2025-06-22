import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAnimais } from '../services/animaisStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function ListaAdotadosScreen({ navigation }) {
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
    const adotados = data.filter(animal => animal.status === 'Adotado');
    setAnimais(adotados);
  };

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PerfilPet', { id: item.id })}
    >
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#666' }}>Sem Foto</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.texto}>{item.raca} - {item.idade} anos</Text>
        <Text style={styles.texto}>Adotante: {item.adotante || 'Não informado'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de PETs Adotados</Text>
      {animais.length === 0 ? (
        <Text style={styles.texto}>Nenhum PET foi adotado ainda.</Text>
      ) : (
        <FlatList
          data={animais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontFamily: 'Barriecito_400Regular', fontSize: 26, color: '#0578F9', marginBottom: 10 },
  nome: { fontFamily: 'Georama_400Regular', fontSize: 18, fontWeight: 'bold' },
  texto: { fontFamily: 'Georama_400Regular', fontSize: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
});