import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Location from "expo-location";
import axios from "axios";
import { Spinner } from "native-base";

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

export default function CardTemperature() {
  const API_KEY = "Ndhv8kSgd1OD7FweIZBs13Pc0Aqkwwo8";
  const [date, setDate] = useState<any>("");
  const [values, setValues] = useState<Values>();
  const data = new Date();
  setInterval(() => {
    setDate(
      `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${
        data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()
      }`
    );
  }, 1000);

  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("A permissão para acesso à localização foi negada.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setX(location.coords.longitude);
      setY(location.coords.latitude);
    })();
  }, []);

  async function getTemperature() {
    await axios
      .get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${y},${x}&apikey=${API_KEY}`
      )
      .then((res) => {setValues(res.data.data), console.log("Api rodou")})
      .catch((erro) => alert(erro));
  }

  useEffect(() => {
    getTemperature()
  }, []);

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
          source={require("@/assets/images/4x/noite.png")}
          resizeMode="contain"
          className="w-1/4 h-[90%] object-cover"
        />
        <View className="flex items-end justify-center">
          <Text className="text-torch-900 dark:text-torch-50 text-md font-jakarta-semibold">
            {date}
          </Text>
          <Text className="text-torch-900 dark:text-torch-50 text-xl mb-3 font-jakarta-semibold">
            Agora está fazendo
          </Text>
          <Text className="text-torch-900 dark:text-torch-50 text-5xl font-jakarta-semibold">
            {values?.values.temperature}ºC
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
