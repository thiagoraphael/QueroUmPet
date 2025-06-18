import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveEntrada } from '../services/financasStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';

export default function NovaEntradaScreen({ navigation }) {
  const [tipo, setTipo] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('');
  const [data, setData] = useState('');
  const [objetivo, setObjetivo] = useState('');

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  if (!barriecitoLoaded || !georamaLoaded) return null;

  const salvarEntrada = async () => {
    if (!tipo || !responsavel || !valor || !metodo || !data) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    await saveEntrada({
      tipo,
      responsavel,
      valor: parseFloat(valor),
      metodo,
      data,
      objetivo,
    });

    Alert.alert('Sucesso', 'Entrada cadastrada com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Entrada</Text>

      <TextInput placeholder="Tipo (ex: Doação, Serviço)" value={tipo} onChangeText={setTipo} style={styles.input} />
      <TextInput placeholder="Responsável" value={responsavel} onChangeText={setResponsavel} style={styles.input} />
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Método (Pix, Dinheiro, etc)" value={metodo} onChangeText={setMetodo} style={styles.input} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={styles.input} />
      <TextInput placeholder="Objetivo" value={objetivo} onChangeText={setObjetivo} style={styles.input} />

      <TouchableOpacity style={styles.botao} onPress={salvarEntrada}>
        <Text style={styles.botaoTexto}>Salvar Entrada</Text>
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