import CourseCard from "@/components/cards/course.card";
import apiClient from '@/middleware/api';
import {
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AllCourses() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    apiClient
      .get(`/get-courses`)
      .then((res: any) => {
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
    Nunito_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 11
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            fontFamily: "Raleway_700Bold",
          }}
        >
          Popular courses
        </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/courses")}>
          <Text
            style={{
              fontSize: 15,
              color: "#2467EC",
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={courses}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <CourseCard item={item} />}
      />
    </View>
  );
}
