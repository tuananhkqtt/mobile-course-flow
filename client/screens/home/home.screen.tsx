import SearchInput from "@/components/common/search.input";
import AllCourses from "@/components/courses/all.courses";
import Header from "@/components/header/header";
import HomeBannerSlider from "@/components/home/home.banner.slider";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <SearchInput homeScreen={true} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <HomeBannerSlider />
        <AllCourses />
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
