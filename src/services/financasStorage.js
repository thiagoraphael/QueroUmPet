import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@financas';

export const getFinancas = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Erro ao buscar finanças:', error);
    return [];
  }
};

export const saveMovimentacao = async (movimentacao) => {
  try {
    const financas = await getFinancas();
    const novaMov = { ...movimentacao, id: Date.now() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...financas, novaMov]));
  } catch (error) {
    console.log('Erro ao salvar movimentação:', error);
  }
};

export const deleteMovimentacao = async (id) => {
  try {
    const financas = await getFinancas();
    const filtradas = financas.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  } catch (error) {
    console.log('Erro ao deletar movimentação:', error);
  }
};