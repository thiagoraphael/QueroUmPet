import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getFinancas } from '../services/financasStorage';
import { useFonts as useBarriecito, Barriecito_400Regular } from '@expo-google-fonts/barriecito';
import { useFonts as useGeorama, Georama_400Regular } from '@expo-google-fonts/georama';
import { useFocusEffect } from '@react-navigation/native';

export default function FinancasScreen({ navigation }) {
  const [financas, setFinancas] = useState([]);

  const [barriecitoLoaded] = useBarriecito({ Barriecito_400Regular });
  const [georamaLoaded] = useGeorama({ Georama_400Regular });

  const carregarFinancas = async () => {
    const data = await getFinancas();
    setFinancas(data);
  };

  useFocusEffect(
    useCallback(() => {
      carregarFinancas();
    }, [])
  );

  const saldo = financas.reduce((total, item) => {
    const tipo = item.tipo.toLowerCase();

    if (tipo === 'doação' || tipo === 'serviço') {
      return total + Number(item.valor);
    }

    if (tipo === 'compra' || tipo === 'compra vacina') {
      return total - Number(item.valor);
    }

    return total;
  }, 0);



  if (!barriecitoLoaded || !georamaLoaded) return null;

  const ultimas = [...financas].slice(-5).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Financeiro</Text>
      <Text style={styles.texto}>Saldo Atual: R$ {saldo.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('NovaEntrada')}>
        <Text style={styles.botaoTexto}>Adicionar Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('NovaSaida')}>
        <Text style={styles.botaoTexto}>Adicionar Saída</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Últimas Movimentações:</Text>
      <FlatList
        data={ultimas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>{item.tipo}: R$ {Number(item.valor).toFixed(2)}</Text>
            <Text style={styles.texto}>Responsável/Destinatário: {item.responsavel || item.destinatario || 'N/A'}</Text>
            <Text style={styles.texto}>Método: {item.metodo}</Text>
            <Text style={styles.texto}>Data: {item.data}</Text>
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
