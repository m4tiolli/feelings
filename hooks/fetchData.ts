import { API_KEY } from "@/constants/Keys";
import axios from "axios";
import { storeData } from "./storageData";

interface Coordinates {
  longitude: number;
  latitude: number;
}

export const fetchRealtime = async (coordinates: Coordinates) => {
  try {
    if (coordinates.longitude !== null && coordinates.latitude !== null) {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${coordinates.latitude},${coordinates.longitude}&apikey=${API_KEY}`
      );
      const weatherData = response.data.data;
      await storeData(weatherData, "Realtime");
      console.log("API rodou");
      return weatherData;
    }
  } catch (error) {
    alert("Erro ao buscar dados metereológicos: " + error);
    console.error("Erro ao buscar dados meteorológicos:", error);
  }
};

export const fetchForecast = async (coordinates: Coordinates) => {
  try {
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast?location=${coordinates.latitude},${coordinates.longitude}&timesteps=daily&units=metric&apikey=${API_KEY}`
    );
    const weatherData = response.data;
    await storeData(weatherData, "Forecast");
    console.log("API rodou");
    return weatherData;
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar dados metereológicos: " + error);
  }
};
