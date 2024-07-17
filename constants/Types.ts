import { ReactNode } from "react";

export type Values = {
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
export type CardTemperatureProps = Readonly<{
  setHorario: React.Dispatch<React.SetStateAction<string>>;
  pediuAtualizacao: boolean;
  setPediuAtualizacao: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export interface Dados {
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
export type OptionType = {
  id: number;
  nome: string;
  active: boolean;
};
export type Props = {
  atual: OptionType;
};
export type OptionProps = {
  children: ReactNode;
  active: boolean;
  onclick: () => void;
};