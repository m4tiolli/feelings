import CardTemperature from "../CardTemperature";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardPrevisao from "../CardPrevisao";
import CardUmidade from "../CardUmidade";
import CardNascer from "../CardNascer";
import CardPor from "../CardPor";
import CardLua from "../CardLua";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  return (
    <SafeAreaView className="flex items-center justify-start flex-1 gap-4 bg-[#efefef] dark:bg-neutral-700">
      <Text
        className="text-torch-900 dark:text-torch-300 text-4xl pt-4 font-jakarta-semibold"
      >
        Bom dia, meu amor!
      </Text>
      <CardTemperature/>
      <View className="flex flex-row items-center justify-between w-[90%]">
      <CardPrevisao/>
      <CardUmidade/>
      </View>
      <View className="flex flex-row items-center justify-between w-[90%]">
      <CardNascer/>
      <CardPor/>
      </View>
      <CardLua/>
    </SafeAreaView>
  );
}
