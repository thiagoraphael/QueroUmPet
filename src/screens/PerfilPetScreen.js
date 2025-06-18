import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { getAnimais, updateAnimal, deleteAnimal } from '../services/animaisStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import * as ImagePicker from 'expo-image-picker';


export default function PerfilPetScreen({ route, navigation }) {
  const { id } = route.params;
  const [pet, setPet] = useState(null);

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  useEffect(() => {
    carregarPet();
  }, []);

  const carregarPet = async () => {
    const animais = await getAnimais();
    const animalSelecionado = animais.find(a => a.id === id);
    setPet(animalSelecionado);
  };

  const escolherNovaFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPet({ ...pet, foto: result.assets[0].uri });
    }
  };

  const salvarAlteracoes = async () => {
    if (pet) {
      await updateAnimal(pet.id, pet);
      Alert.alert('Sucesso', 'Dados atualizados!');
      navigation.goBack();
    }
  };

  const excluirPet = async () => {
    Alert.alert('Confirmar', 'Tem certeza que deseja excluir este PET?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', style: 'destructive', onPress: async () => {
          await deleteAnimal(pet.id);
          Alert.alert('Excluído', 'PET removido.');
          navigation.goBack();
        }
      }
    ]);
  };

  if (!barriecitoLoaded || !georamaLoaded || !pet) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Perfil do PET</Text>

      {pet.foto ? (
        <Image source={{ uri: pet.foto }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#666' }}>Sem Foto</Text>
        </View>
      )}
      <TouchableOpacity style={styles.botaoFoto} onPress={escolherNovaFoto}>
        <Text style={styles.botaoTexto}>Alterar Foto</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome" value={pet.nome} onChangeText={text => setPet({ ...pet, nome: text })} />
      <TextInput style={styles.input} placeholder="Raça" value={pet.raca} onChangeText={text => setPet({ ...pet, raca: text })} />
      <TextInput style={styles.input} placeholder="Idade" value={pet.idade} onChangeText={text => setPet({ ...pet, idade: text })} />
      <TextInput style={styles.input} placeholder="Cor" value={pet.cor} onChangeText={text => setPet({ ...pet, cor: text })} />
      <TextInput style={styles.input} placeholder="Observações" value={pet.observacoes} onChangeText={text => setPet({ ...pet, observacoes: text })} />

      <TextInput style={styles.input} placeholder="Status (Disponível ou Adotado)" value={pet.status} onChangeText={text => setPet({ ...pet, status: text })} />

      {pet.status === 'Adotado' && (
        <>
          <TextInput style={styles.input} placeholder="Nome do Adotante" value={pet.adotante || ''} onChangeText={text => setPet({ ...pet, adotante: text })} />
          <TextInput style={styles.input} placeholder="Contato do Adotante" value={pet.contatoAdotante || ''} onChangeText={text => setPet({ ...pet, contatoAdotante: text })} />
          <TextInput style={styles.input} placeholder="Data da Adoção" value={pet.dataAdocao || ''} onChangeText={text => setPet({ ...pet, dataAdocao: text })} />
        </>
      )}

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.botaoTexto}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoExcluir} onPress={excluirPet}>
        <Text style={styles.botaoTexto}>Excluir PET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  titulo: { fontFamily: 'Barriecito_400Regular', fontSize: 26, color: '#0578F9', marginBottom: 10, textAlign: 'center' },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
    botaoFoto: {
    backgroundColor: '#009C53',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10,
    fontFamily: 'Georama_400Regular', fontSize: 16
  },
  botaoSalvar: {
    backgroundColor: '#0578F9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  botaoExcluir: {
    backgroundColor: '#c62828',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});