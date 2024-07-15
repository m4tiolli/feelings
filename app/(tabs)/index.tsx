import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ptBR from "dayjs/locale/pt-br";
import { useThemeColor } from "@/hooks/useThemeColor";
import Option from "../Option";
import Card from "../Card";

import CardTemperature from "../CardTemperature";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(ptBR);

export type OptionType = {
  id: number;
  nome: string;
  active: boolean;
};

const Index = () => {
  const [saudacao, setSaudacao] = useState<string>("");
  const [horario, setHorario] = useState<string>("");
  const [pediuAtualizacao, setPediuAtualizacao] = useState<boolean>(false);
  const [horarioUltimaPesquisa, setHorarioUltimaPesquisa] =
    useState<string>("");
  const [options, setOptions] = useState<OptionType[]>([]);
  const [activeOption, setActiveOption] = useState<OptionType | null>({
    id: 1,
    nome: "Hoje",
    active: true,
  });

  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = () => {
    setPediuAtualizacao(true);
    atualizarHorarioUltimaPesquisa();
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      ToastAndroid.show("Clima atualizado!", ToastAndroid.LONG);
    }, 2000);
  };

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function atualizarHorarioUltimaPesquisa() {
    const dataFormatada = dayjs().format("DD/MM/YYYY HH:mm:ss");
    setHorarioUltimaPesquisa(dataFormatada);
  }

  useEffect(() => {
    function atualizarSaudacao() {
      const hora = dayjs().hour();
      let saudacaoAtual;
      if (hora >= 6 && hora < 12) {
        saudacaoAtual = "Bom dia";
      } else if (hora >= 12 && hora < 18) {
        saudacaoAtual = "Boa tarde";
      } else {
        saudacaoAtual = "Boa noite";
      }
      setSaudacao(saudacaoAtual);
    }
    atualizarSaudacao();
    atualizarHorarioUltimaPesquisa();

    const diaSemana = dayjs().day();
    const diasDaSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const novasOpcoes = [
      { id: 1, nome: "Hoje", active: true },
      { id: 2, nome: "Amanhã", active: false },
    ];

    for (let i = 1; i <= 3; i++) {
      const proximoDia = (diaSemana + i) % 7;
      novasOpcoes.push({
        id: i + 2,
        nome: diasDaSemana[proximoDia + 1],
        active: false,
      });
    }

    setOptions(novasOpcoes);
  }, [horario]);

  const changeActive = (index: number) => {
    const updatedOptions = options.map((option) => ({
      ...option,
      active: option.id === index,
    }));
    setOptions(updatedOptions);
    const active = updatedOptions.find((option) => option.id === index);
    setActiveOption(active || null);
  };

  return (
    <SafeAreaView className="flex items-center justify-start flex-1 gap-4 bg-[#efefef] dark:bg-neutral-700">
      <Text className="text-torch-900 dark:text-torch-300 text-4xl pt-4 font-jakarta-semibold">
        {saudacao}, meu amor!
      </Text>
      <CardTemperature
        setHorario={setHorario}
        pediuAtualizacao={pediuAtualizacao}
        setPediuAtualizacao={setPediuAtualizacao}
      />
      <View className="w-[90%] flex flex-row items-center">
        <Text className="-mt-4 font-jakarta-light text-torch-900 dark:text-torch-50">
          Última pesquisa: {horarioUltimaPesquisa}
        </Text>
        <TouchableOpacity className="-mt-4 ml-2" onPress={spin}>
          <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
            <FontAwesome
              name="refresh"
              color={useThemeColor(
                { light: "#881425", dark: "#fff1f3" },
                "text"
              )}
              size={20}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        horizontal
        style={{ width: "90%", height: 50, flexGrow: 0 }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {options.map((option) => (
          <Option
            active={option.active}
            key={option.id}
            onclick={() => changeActive(option.id)}
          >
            {option.nome}
          </Option>
        ))}
      </ScrollView>
      {activeOption && <Card atual={activeOption} />}
    </SafeAreaView>
  );
};

export default Index;
