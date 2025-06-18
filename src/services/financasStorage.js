import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@financas';

export async function getFinancas() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveEntrada(novaEntrada) {
  const financas = await getFinancas();
  const id = Date.now();
  const entrada = { id, tipo: 'Entrada', ...novaEntrada };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...financas, entrada]));
}

export async function saveSaida(novaSaida) {
  const financas = await getFinancas();
  const id = Date.now();
  const saida = { id, tipo: 'Saída', ...novaSaida };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...financas, saida]));
}

export async function deleteMovimentacao(id) {
  const financas = await getFinancas();
  const filtradas = financas.filter(f => f.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
}