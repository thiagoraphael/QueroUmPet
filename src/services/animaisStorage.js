import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@animais';

export async function getAnimais() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveAnimal(novoAnimal) {
  const animais = await getAnimais();
  const id = Date.now();  // Gerar um ID único simples
  const animalComId = { id, ...novoAnimal };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...animais, animalComId]));
}

export async function updateAnimal(id, dadosAtualizados) {
  const animais = await getAnimais();
  const atualizados = animais.map(a => a.id === id ? { ...a, ...dadosAtualizados } : a);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
}

export async function deleteAnimal(id) {
  const animais = await getAnimais();
  const filtrados = animais.filter(a => a.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
}