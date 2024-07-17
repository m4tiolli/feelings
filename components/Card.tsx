import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Location from "expo-location";
import { Dados, Props } from "@/constants/Types";
import { getData, isForecastDataExpired } from "@/hooks/storageData";
import { fetchForecast } from "@/hooks/fetchData";
import Spinner from "./Spinner";

const Card = ({ atual }: Props) => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [dados, setDados] = useState<Dados | null>(null);
  const [valorUv, setValorUv] = useState<string>("");

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude);
        setLatitude(location.coords.latitude);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (latitude && longitude) {
        try {
          const storedData = await getData("Forecast");
          const coordinates = { latitude: latitude, longitude: longitude };
          if (!storedData || isForecastDataExpired(storedData)) {
            const dados = await fetchForecast(coordinates);
            setDados(dados);
          } else {
            setDados(storedData);
          }
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    };
    fetch();
  }, [latitude, longitude]);

  useEffect(() => {
    if (dados) {
      const valores = dados.timelines.daily[atual.id].values;
      const uv = valores.uvIndexMax;
      let uvDescription = "";
      if (uv < 3) {
        uvDescription = "baixo";
      } else if (uv > 2 && uv < 6) {
        uvDescription = "moderado";
      } else if (uv > 5 && uv < 8) {
        uvDescription = "alto";
      } else if (uv > 7 && uv < 11) {
        uvDescription = "muito alto";
      } else {
        uvDescription = "extremo";
      }
      setValorUv(uvDescription);
    }
  }, [dados, atual.id]);

  const cores = useThemeColor({ light: "#881425", dark: "#404040" }, "text");

  if (!dados) {
    return <Spinner />;
  } else {
    const valores = dados.timelines.daily[atual.id].values;
    return (
      <View className="bg-torch-200 w-[90%] flex ml-4 h-28 rounded-md border-[.5px] border-torch-300 flex-row items-center justify-center">
        <View className="w-[45%] flex items-start justify-center flex-col ml-4">
          <View className="flex flex-row items-center justify-center gap-2">
            <Feather name={"sun"} size={16} color={cores} />
            <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
              UV: {valores.uvIndexMax} ({valorUv})
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center gap-2">
            <Ionicons name="water-outline" size={16} color={cores} />
            <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
              Umidade do ar: {valores.humidityAvg.toFixed(0)}%
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center gap-2">
            <Feather name={"cloud-rain"} size={16} color={cores} />
            <Text className="my-[2px] font-jakarta-medium text-torch-900 dark:text-neutral-700">
              Prob. chuva: {valores.precipitationProbabilityAvg.toFixed(0)}%
            </Text>
          </View>
        </View>
        <View className="w-[45%] flex items-center justify-center flex-col">
          <Text className="text-torch-900 dark:text-neutral-700 font-jakarta-semibold text-xl">
            {valores.temperatureMax.toFixed(0)}ºC /{" "}
            {valores.temperatureMin.toFixed(0)}ºC
          </Text>
          <Text className="text-torch-900 dark:text-neutral-700 font-jakarta-light text-sm">
            Max / Min
          </Text>
        </View>
      </View>
    );
  }
};

export default Card;
