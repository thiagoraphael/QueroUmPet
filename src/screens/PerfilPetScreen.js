import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getAnimais, deleteAnimal } from '../services/animaisStorage';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import AppLoading from 'expo-app-loading';

export default function PerfilPetScreen({ route, navigation }) {
  const { id } = route.params;
  const [pet, setPet] = useState(null);
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  useEffect(() => {
    carregarPet();
  }, []);

  const carregarPet = async () => {
    const animais = await getAnimais();
    const encontrado = animais.find(a => a.id === id);
    setPet(encontrado);
  };

  const excluirPet = () => {
    Alert.alert('Excluir Animal', 'Tem certeza que deseja excluir este animal?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          await deleteAnimal(id);
          Alert.alert('Sucesso', 'Animal excluído!');
          navigation.goBack();
        },
        style: 'destructive'
      },
    ]);
  };

  if (!georamaLoaded) return <AppLoading />;
  if (!pet) return <Text>Carregando...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      {pet.foto ? (
        <Image source={{ uri: pet.foto }} style={styles.foto} />
      ) : (
        <View style={styles.fotoPlaceholder}>
          <Text style={styles.texto}>Sem Foto</Text>
        </View>
      )}

      <Text style={styles.nome}>{pet.nome}</Text>

      <Text style={styles.texto}>Raça: {pet.raca}</Text>
      <Text style={styles.texto}>Idade: {pet.idade} anos</Text>
      <Text style={styles.texto}>Cor: {pet.cor}</Text>
      <Text style={styles.texto}>Observações: {pet.observacoes || 'Nenhuma'}</Text>

      {pet.adotante && (
        <>
          <Text style={styles.subtitulo}>Adotante:</Text>
          <Text style={styles.texto}>Nome: {pet.adotante.nome}</Text>
          <Text style={styles.texto}>Contato: {pet.adotante.contato}</Text>
          <Text style={styles.texto}>Data de Adoção: {pet.dataAdocao}</Text>
        </>
      )}

      {/* Botões de ação */}
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate('EditarPet', { id: pet.id })}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoExcluir} onPress={excluirPet}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  foto: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  fotoPlaceholder: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#ccc',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  nome: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  texto: { fontFamily: 'Georama_400Regular', fontSize: 16, marginBottom: 5 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  botoes: { flexDirection: 'row', marginTop: 20 },
  botaoEditar: {
    backgroundColor: '#0578F9', padding: 12, borderRadius: 8,
    marginRight: 10, flex: 1, alignItems: 'center'
  },
  botaoExcluir: {
    backgroundColor: '#dc3545', padding: 12, borderRadius: 8,
    flex: 1, alignItems: 'center'
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});