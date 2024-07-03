import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";

export default function CardTemperature() {
  const [date, setDate] = useState<any>("");
    const data = new Date();
    setTimeout(() => {
      setDate(`${data.getHours()}:${data.getMinutes()}`);
    }, 5000);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[90%] ml-4 mt-4 h-40 rounded-md flex items-center justify-center border-[0.5px] border-torch-200"
    >
      <LinearGradient
        colors={["#ff9dac", "#404040"]}
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
          <Text className="text-torch-50 text-md font-jakarta-semibold">
            {date}
          </Text>
          <Text className="text-torch-50 text-xl mb-3 font-jakarta-semibold">
            Agora está fazendo
          </Text>
          <Text className="text-torch-50 text-5xl font-jakarta-semibold">
            29 ºC
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
