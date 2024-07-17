import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Emergency() {
  const [vezes, setVezes] = useState<number>(0);

  useEffect(() => {
    async function getVezes() {
      const qtd = await AsyncStorage.getItem("vezes");
      setVezes(parseInt(qtd ?? "0"));
    }
    getVezes();
  }, []);

  const falta = () => {
    setVezes((prev) => prev + 1);
    AsyncStorage.setItem("vezes", vezes.toString());
    Linking.openURL(
      "whatsapp://send?text=_estou com saudades meu amor_&phone=5511943843525"
    );
  };

  return (
    <SafeAreaView className="flex items-center justify-center flex-1 gap-4 bg-[#efefef] dark:bg-neutral-700">
      <Text className="font-jakarta-medium text-torch-900 dark:text-torch-50 text-xl w-[90%] text-center">
        Aperte o botão quando sentir minha falta
      </Text>
      <TouchableOpacity
        onPress={falta}
        className="bg-torch-300 w-1/2 flex items-center justify-center py-3 rounded-md"
      >
        <Text className="text-torch-50 font-jakarta-semibold text-xl">
          Sinto sua falta :(
        </Text>
      </TouchableOpacity>
      <Text className="font-jakarta-medium text-torch-900 dark:text-torch-50 text-xl w-[90%] text-center">
        Vezes que sentimos falta um do outro: {vezes}
      </Text>
    </SafeAreaView>
  );
}
