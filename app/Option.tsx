import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  children: ReactNode;
  active: boolean;
  onclick: () => void;
};

const Option = ({ children, active, onclick }: Props) => {
  return (
    <TouchableOpacity
      onPress={onclick}
      className={`border-[1px] border-torch-300 flex items-center justify-center px-6 py-2 rounded-full ${
        active ? "bg-torch-300 text-white" : "bg-transparent text-torch-300"
      }`}
    >
      <Text className={active ? "text-white dark:text-neutral-700" : "text-torch-300"}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Option;
