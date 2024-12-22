import SearchInput from "@/components/common/search.input";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";

export default function SearchScreen() {
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchInput />
      </SafeAreaView>
    </LinearGradient>
  );
}
