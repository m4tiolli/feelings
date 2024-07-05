import axios from "axios";

// const API_KEY = "Ndhv8kSgd1OD7FweIZBs13Pc0Aqkwwo8"
const API_KEY = "";

interface Response {
  data: {
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
}

export async function getTemperature(x: string, y: string) {
  let response: Response;
  await axios
    .get(
      `https://api.tomorrow.io/v4/weather/forecast?location=${y}, ${x}&apikey=${API_KEY}`
    )
    .then((res) => (response = res.data))
    .catch((erro) => (response = erro));
  return response.data.values.temperature;
}
