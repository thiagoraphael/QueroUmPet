import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@animais';

export const getAnimais = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Erro ao buscar animais:', error);
    return [];
  }
};

export const saveAnimal = async (animal) => {
  try {
    const animais = await getAnimais();
    const novoAnimal = { ...animal, id: Date.now() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...animais, novoAnimal]));
  } catch (error) {
    console.log('Erro ao salvar animal:', error);
  }
};

export const updateAnimalStatus = async (id, novoStatus) => {
  try {
    const animais = await getAnimais();
    const atualizados = animais.map((animal) =>
      animal.id === id ? { ...animal, status: novoStatus } : animal
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
  } catch (error) {
    console.log('Erro ao atualizar status:', error);
  }
};

export const deleteAnimal = async (id) => {
  try {
    const animais = await getAnimais();
    const filtrados = animais.filter((animal) => animal.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
  } catch (error) {
    console.log('Erro ao deletar animal:', error);
  }
};