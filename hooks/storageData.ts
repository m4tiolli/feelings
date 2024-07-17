import { Dados, Values } from "@/constants/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: Dados | Values, nome: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(nome, jsonValue);
  } catch (error) {
    console.error("Erro ao salvar os dados meteorológicos:", error);
  }
};

export const getData = async (nome: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(nome);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Erro ao recuperar dados meteorológicos:", error);
    return null;
  }
};

export const isForecastDataExpired = (storedData: Dados): boolean => {
  const currentTime = new Date().getTime();
  const storedTime = new Date(storedData.timelines.daily[0].time).getTime();
  return currentTime - storedTime > 60 * 60 * 1000;
};

export const isRealtimeDataExpired = (storedData: Values): boolean => {
  const currentTime = new Date().getTime();
  const storedTime = new Date(storedData.time).getTime();
  return currentTime - storedTime > 60 * 60 * 1000;
};
