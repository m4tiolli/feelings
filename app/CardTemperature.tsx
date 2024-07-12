import { LinearGradient } from "expo-linear-gradient";
import { SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import axios from "axios";
import { Image } from "expo-image";
import * as Location from "expo-location";
import * as Network from "expo-network";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getImage } from "@/assets/images/png/export";

type Values = {
  time: string;
  values: {
    cloudBase: number;
    cloudCeiling: number;
    cloudCover: number;
    dewPoint: number;
    freezingRainIntensity: number;
    humidity: number;
    precipitationProbability: number;
    pressureSurfaceLevel: number;
    rainIntensity: number;
    sleetIntensity: number;
    snowIntensity: number;
    temperature: number;
    temperatureApparent: number;
    uvHealthConcern: number;
    uvIndex: number;
    visibility: number;
    weatherCode: number;
    windDirection: number;
    windGust: number;
    windSpeed: number;
  };
};

export default function CardTemperature({setHorario}: SetStateAction<string>) {
  const API_KEY = "Ndhv8kSgd1OD7FweIZBs13Pc0Aqkwwo8";
  const [date, setDate] = useState<string>("");
  const [values, setValues] = useState<Values | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = new Date();
      const formattedDate = `${
        newData.getHours() < 10 ? "0" + newData.getHours() : newData.getHours()
      }:${
        newData.getMinutes() < 10
          ? "0" + newData.getMinutes()
          : newData.getMinutes()
      }:${
        newData.getSeconds() < 10
          ? "0" + newData.getSeconds()
          : newData.getSeconds()
      }`;
      setDate(formattedDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    const fetchData = async () => {
      try {
        const storedData = await getData();
        if (!storedData || isDataExpired(storedData)) {
          await fetchWeatherData();
        } else {
          setValues(storedData);
        }
        setHorario(values?.time)
      } catch (error) {
        console.error(
          "Erro ao buscar ou armazenar dados meteorológicos:",
          error
        );
        setErrorMsg("Erro ao buscar dados meteorológicos.");
      }
    };

    fetchData();
  }, [longitude, latitude]);

  const fetchWeatherData = async () => {
    try {
      if (longitude !== null && latitude !== null) {
        const response = await axios.get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${API_KEY}`
        );
        const weatherData = response.data.data;
        setValues(weatherData);
        await storeData(weatherData);
        console.log("API rodou");
      }
    } catch (error) {
      console.error("Erro ao buscar dados meteorológicos:", error);
      setErrorMsg("Erro ao buscar dados meteorológicos.");
    }
  };

  const performBackgroundTask = () => {
    Network.getNetworkStateAsync().then((state) => {
      if (state.isConnected) {
        // Código que precisa ser executado em segundo plano
      } else {
        console.log("Internet não está disponível");
        TaskManager.unregisterTaskAsync("getInfos");
      }
    });
  };

  TaskManager.defineTask("getInfos", performBackgroundTask);

  const storeData = async (value: Values) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("WeatherData", jsonValue);
    } catch (error) {
      console.error("Erro ao armazenar dados meteorológicos:", error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("WeatherData");
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Erro ao obter dados meteorológicos:", error);
      return null;
    }
  };

  const isDataExpired = (storedData: Values) => {
    // Implemente aqui a lógica para verificar se os dados estão expirados
    // Exemplo simples: verificar se os dados foram salvos há mais de uma hora
    const currentTime = new Date().getTime();
    const storedTime = new Date(storedData.time).getTime();
    return currentTime - storedTime > 60 * 60 * 1000; // 1 hora em milissegundos
  };
  

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[90%] ml-4 mt-4 h-40 rounded-md flex items-center justify-center border-[0.5px] border-torch-200"
    >
      <LinearGradient
        colors={[
          "#ff9dac",
          useThemeColor({ light: "#ffdfe4", dark: "#404040" }, "text"),
        ]}
        locations={[0.1, 0.8]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 w-full items-center justify-evenly rounded-md flex-row"
      >
        <Image
          className="w-1/4 h-[90%] object-cover"
          source={getImage(values?.values.weatherCode.toString() ?? '10000')}
          contentFit="contain"
          transition={1000}
        />
        <View className="flex items-end justify-center">
          <Text className="text-torch-900 dark:text-torch-50 text-md font-jakarta-semibold">
            {date}
          </Text>
          <Text className="text-torch-900 dark:text-torch-50 text-xl mb-3 font-jakarta-semibold">
            Agora está fazendo
          </Text>
          <Text className="text-torch-900 dark:text-torch-50 text-5xl font-jakarta-semibold">
            {values?.values.temperature.toFixed(0)}ºC
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
