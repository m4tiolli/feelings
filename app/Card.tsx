import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { OptionType } from "./(tabs)";
import * as Location from "expo-location";
import axios from "axios";
import { API_KEY } from "./CardTemperature";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Dados {
  timelines: {
    daily: [
      {
        time: string;
        values: {
          temperatureMax: number;
          temperatureMin: number;
          humidityAvg: number;
          precipitationProbabilityAvg: number;
          uvIndexMax: number;
        };
      }
    ];
  };
  location: {
    lat: string;
    lon: string;
    name: string;
    type: string;
  };
}

type Props = {
  atual: OptionType;
};

const Card = ({ atual }: Props) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [dados, setDados] = useState<Dados | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("A permissão para acesso à localização foi negada.");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude);
        setLatitude(location.coords.latitude);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
        setErrorMsg("Erro ao obter localização.");
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const storedData = await getData();
        if (!storedData || isDataExpired(storedData)) {
          await fetchData();
        } else {
          setDados(storedData);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetch();
  }, [latitude, longitude]);


  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&timesteps=daily&units=metric&apikey=${API_KEY}`
      );
      const weatherData = response.data;
      setDados(weatherData);
      await storeData(weatherData);
      console.log("API rodou");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const storeData = async (value: Dados) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("Forecast", jsonValue);
    } catch (error) {
      console.error("Erro ao armazenar dados meteorológicos:", error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Forecast");
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Erro ao obter dados meteorológicos:", error);
      return null;
    }
  };

  const isDataExpired = (storedData: Dados): boolean => {
    const currentTime = new Date().getTime();
    const storedTime = new Date(storedData.timelines.daily[0].time).getTime();
    return currentTime - storedTime > 60 * 60 * 1000;
  };

  const {
    temperatureMax,
    temperatureMin,
    humidityAvg,
    precipitationProbabilityAvg,
    uvIndexMax,
  } = dados.timelines.daily[atual.id].values;
  return (
    <View className="bg-torch-200 w-[90%] flex ml-4 h-28 rounded-md border-[.5px] border-torch-300 flex-row items-center justify-center">
      <View className="w-[45%] flex items-start justify-center flex-col ml-4">
        <View className="flex flex-row items-center justify-center gap-2">
          <Feather
            name={"sun"}
            size={16}
            color={useThemeColor({ light: "#881425", dark: "#404040" }, "text")}
          />
          <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
            UV: {uvIndexMax}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center gap-2">
          <Ionicons
            name="water-outline"
            size={16}
            color={useThemeColor({ light: "#881425", dark: "#404040" }, "text")}
          />
          <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
            Umidade do ar: {humidityAvg}%
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center gap-2">
          <Feather
            name={"cloud-rain"}
            size={16}
            color={useThemeColor({ light: "#881425", dark: "#404040" }, "text")}
          />
          <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
            Prob. chuva: {precipitationProbabilityAvg}%
          </Text>
        </View>
      </View>
      <View className="w-[45%] flex items-center justify-center flex-col">
        <Text className="text-torch-900 dark:text-neutral-700 font-jakarta-semibold text-xl">
          {temperatureMax}ºC / {temperatureMin}ºC
        </Text>
        <Text className="text-torch-900 dark:text-neutral-700 font-jakarta-light text-sm">
          Max / Min
        </Text>
      </View>
    </View>
  );
};

export default Card;
