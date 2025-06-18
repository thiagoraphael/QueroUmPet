import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveSaida } from '../services/financasStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';

export default function NovaSaidaScreen({ navigation }) {
  const [tipo, setTipo] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('');
  const [data, setData] = useState('');
  const [animal, setAnimal] = useState('');

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const salvarSaida = async () => {
    if (!tipo || !destinatario || !valor || !metodo || !data) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    await saveSaida({
      tipo,
      destinatario,
      valor: parseFloat(valor),
      metodo,
      data,
      animal,
    });

    Alert.alert('Sucesso', 'Saída registrada com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Saída</Text>

      <TextInput placeholder="Tipo (ex: Compra, Serviço)" value={tipo} onChangeText={setTipo} style={styles.input} />
      <TextInput placeholder="Destinatário" value={destinatario} onChangeText={setDestinatario} style={styles.input} />
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Método (Pix, Dinheiro, etc)" value={metodo} onChangeText={setMetodo} style={styles.input} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={styles.input} />
      <TextInput placeholder="Animal (se relacionado a um PET)" value={animal} onChangeText={setAnimal} style={styles.input} />

      <TouchableOpacity style={styles.botao} onPress={salvarSaida}>
        <Text style={styles.botaoTexto}>Salvar Saída</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontFamily: 'Barriecito_400Regular', fontSize: 26, color: '#0578F9', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10,
    fontFamily: 'Georama_400Regular', fontSize: 16
  },
  botao: {
    backgroundColor: '#0578F9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});