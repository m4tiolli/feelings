import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CardPrevisao from "../CardPrevisao";
import CardUmidade from "../CardUmidade";
import CardNascer from "../CardNascer";
import CardPor from "../CardPor";
import CardLua from "../CardLua";
import CardTemperature from "../CardTemperature";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ptBR from "dayjs/locale/pt-br";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(ptBR);

export default function Index() {
  const [saudacao, setSaudacao] = useState<string>("");
  const [horario, setHorario] = useState<string>("")
  const [horarioUltimaPesquisa, setHorarioUltimaPesquisa] =
    useState<string>("");
  useEffect(() => {
    // Função para obter o horário atual no fuso horário de Brasília
    function obterHorarioAtualBrasilia() {
      return dayjs.utc().format();
    }

    // Atualiza a saudação com base no horário atual
    function atualizarSaudacao() {
      const agora = obterHorarioAtualBrasilia();
      let saudacaoAtual = agora;
      const hora = 1;

      if (hora >= 6 && hora < 12) {
        saudacaoAtual = "Bom dia";
      } else if (hora >= 12 && hora < 18) {
        saudacaoAtual = "Boa tarde";
      } else {
        saudacaoAtual = "Boa noite";
      }

      setSaudacao(saudacaoAtual);
    }

    // Atualiza o horário da última pesquisa
    function atualizarHorarioUltimaPesquisa() {
      const dataRecebida = horario; // Substitua pela data recebida

      const dataFormatada = dayjs(dataRecebida).format("DD/MM/YYYY HH:mm:ss");
      setHorarioUltimaPesquisa(dataFormatada);
    }

    atualizarSaudacao(); // Atualiza a saudação ao montar o componente
    atualizarHorarioUltimaPesquisa(); // Atualiza o horário da última pesquisa ao montar o componente
  }, []);
  return (
    <SafeAreaView className="flex items-center justify-start flex-1 gap-4 bg-[#efefef] dark:bg-neutral-700">
      <Text className="text-torch-900 dark:text-torch-300 text-4xl pt-4 font-jakarta-semibold">
        {saudacao}, meu amor!
      </Text>
      <CardTemperature setHorario={setHorario} />
      <View className="w-[90%]">
        <Text className="-mt-4 font-jakarta-light text-torch-900 dark:text-torch-50">
          Última pesquisa: {horarioUltimaPesquisa}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between w-[90%]">
        <CardPrevisao />
        <CardUmidade />
      </View>
      <View className="flex flex-row items-center justify-between w-[90%]">
        <CardNascer />
        <CardPor />
      </View>
      <CardLua />
    </SafeAreaView>
  );
}
