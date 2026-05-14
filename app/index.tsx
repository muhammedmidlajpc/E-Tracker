import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const value = await AsyncStorage.getItem("isLoggedIn");
        if (value === "true") {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
