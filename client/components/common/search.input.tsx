import apiClient from '@/middleware/api';
import { Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import CourseCard from '../cards/course.card';

export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {
  const [value, setValue] = useState("");
  const [courses, setcourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    apiClient
      .get(`/get-courses`)
      .then((res: any) => {
        setcourses(res.data.courses);
        if (!homeScreen) {
          setFilteredCourses(res.data.courses);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (homeScreen && value === "") {
      setFilteredCourses([]);
    } else if (value) {
      const filtered = courses.filter((course: CoursesType) =>
        course.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else if (!homeScreen) {
      setFilteredCourses(courses);
    }
  }, [value, courses]);

  let [fontsLoaded, fontError] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderCourseItem = ({ item }: { item: CoursesType }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        padding: 10,
        width: widthPercentageToDP("90%"),
        marginLeft: "1.5%",
        flexDirection: "row",
      }}
      onPress={() =>
        router.push({
          pathname: "/(routes)/course-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <Image
        source={{ uri: item?.thumbnail?.url }}
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
      <Text
        style={{
          fontSize: 14,
          paddingLeft: 10,
          width: widthPercentageToDP("75%"),
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View >
      <View style={styles.filteringContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, { fontFamily: "Nunito_700Bold" }]}
            placeholder="Search"
            value={value}
            onChangeText={setValue}
            placeholderTextColor={"#C67cc"}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={() => router.push("/(tabs)/search")}
          >
            <AntDesign name="search1" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={filteredCourses}
          keyExtractor={(item: CoursesType) => item._id}
          renderItem={
            homeScreen
              ? renderCourseItem
              : ({ item }) => <CourseCard item={item} key={item._id} />
          }
          contentContainerStyle={!homeScreen && { paddingBottom: 150 }}
        />
      </View>
      {!homeScreen && (
        <>
          {filteredCourses?.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                paddingTop: 50,
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              No data avaialble to show!
            </Text>
          )}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  filteringContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    paddingBottom: 10, paddingTop: 10
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },

  searchIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#2467EC",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "black",
    paddingVertical: 10,
    width: 271,
    height: 48,
  },
});
