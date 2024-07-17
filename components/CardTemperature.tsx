import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { getImage } from "@/assets/images/png/export";
import { CardTemperatureProps, Values } from "@/constants/Types";
import { getData, isRealtimeDataExpired } from "@/hooks/storageData";
import { fetchRealtime } from "@/hooks/fetchData";

export default function CardTemperature({
  setHorario,
  pediuAtualizacao,
  setPediuAtualizacao,
}: CardTemperatureProps) {
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
          errorMsg ?? alert(errorMsg);
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
      if (latitude && longitude) {
        try {
          const storedData = await getData("Realtime");
          const coordinates = { latitude, longitude };
          if (!storedData || isRealtimeDataExpired(storedData)) {
            const dados = await fetchRealtime(coordinates);
            setValues(dados);
          } else {
            setValues(storedData);
          }
          setHorario(values?.time ?? "");
        } catch (error) {
          console.error(
            "Erro ao buscar ou armazenar dados meteorológicos:",
            error
          );
          setErrorMsg("Erro ao buscar dados meteorológicos.");
        }
      }
    };
    fetchData();
  }, [longitude, latitude]);

  useEffect(() => {
    const pediu = async () => {
      if (pediuAtualizacao) {
        if (latitude && longitude) {
          const data = await fetchRealtime({ latitude, longitude });
          setValues(data);
          setPediuAtualizacao(false);
        }
      }
    };
    pediu();
  }, [pediuAtualizacao, latitude, longitude]);

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
          source={getImage(values?.values.weatherCode.toString() ?? "10000")}
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
