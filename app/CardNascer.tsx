import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text } from "react-native";

export default function CardNascer(){
  return(
    <TouchableOpacity activeOpacity={.8} className="w-[48%] h-40 rounded-md flex items-center justify-center border-[0.5px] border-torch-200">
        <LinearGradient
          colors={["#fff1f3", "#ff9dac"]}
          locations={[0.1, 0.8]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 w-full items-center justify-center rounded-md"
        >
          <Text className="text-torch-800 text-2xl font-jakarta-semibold">O sol nasceu às 06h</Text>
        </LinearGradient>
      </TouchableOpacity>
  )
}