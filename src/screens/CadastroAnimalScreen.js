import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveAnimal } from '../services/animaisStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';

export default function CadastroAnimalScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [cor, setCor] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState('');

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const escolherFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const salvarAnimal = async () => {
    if (!nome || !raca || !idade) {
      Alert.alert('Erro', 'Preencha pelo menos Nome, Raça e Idade.');
      return;
    }

    await saveAnimal({
      nome,
      raca,
      idade,
      cor,
      observacoes,
      foto,
      status: 'Disponível',
    });

    Alert.alert('Sucesso', 'Animal cadastrado!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Animal</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Raça" value={raca} onChangeText={setRaca} style={styles.input} />
      <TextInput placeholder="Idade (anos)" value={idade} onChangeText={setIdade} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Cor" value={cor} onChangeText={setCor} style={styles.input} />
      <TextInput placeholder="Observações" value={observacoes} onChangeText={setObservacoes} style={styles.input} />

      <TouchableOpacity style={styles.botaoFoto} onPress={escolherFoto}>
        <Text style={styles.botaoTexto}>Selecionar Foto</Text>
      </TouchableOpacity>

      {foto ? (
        <Image source={{ uri: foto }} style={styles.previewFoto} />
      ) : (
        <Text style={styles.texto}>Nenhuma foto selecionada</Text>
      )}

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAnimal}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontFamily: 'Barriecito_400Regular', fontSize: 26, color: '#0578F9', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10
  },
  botaoFoto: {
    backgroundColor: '#0578F9', padding: 10,
    borderRadius: 8, alignItems: 'center', marginBottom: 10
  },
  botaoSalvar: {
    backgroundColor: '#28a745', padding: 12,
    borderRadius: 8, alignItems: 'center', marginTop: 10
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  previewFoto: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  texto: { fontFamily: 'Georama_400Regular', fontSize: 16 },
});