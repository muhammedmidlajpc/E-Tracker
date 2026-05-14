import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import * as React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.main_container}>
          <View style={styles.container}>
            <View className="p-5 mt-[50]">
              <Text className="text-black text-5xl text-center">Welcome</Text>
            </View>
            <View className="flex justify-center gap-5">
              <View className="rounded-md">
                <TextInput
                  label="Email"
                  mode="outlined"
                  value={formValue.email}
                  style={{ marginTop: 20 }}
                  onChangeText={(email) =>
                    setFormValue((prev) => ({ ...prev, email: email }))
                  }
                />
              </View>
              <View className="">
                <TextInput
                  label="Password"
                  value={formValue.password}
                  onChangeText={(password) =>
                    setFormValue((prev) => ({ ...prev, password: password }))
                  }
                  mode="outlined"
                  secureTextEntry
                  style={{ marginTop: 16 }}
                />
              </View>
              <View>
                <Text className="text-right">Forgot Password?</Text>
              </View>
              <View className="rounded-sm p-3.5 bg-slate-300 shadow-slate-100 shadow-md">
                <Pressable
                  onPress={() => {
                    console.log("Logged in");
                    AsyncStorage.setItem("isLoggedIn", "true");
                    router.replace("/(tabs)/home");
                  }}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "white" : "#cbd5e1",
                  })}
                >
                  <Text className="text-center">Login</Text>
                </Pressable>
              </View>
            </View>
            <View className="mb-[50] flex-row justify-end">
              <Button
                icon="arrow-right"
                buttonColor="#cbd5e2"
                textColor="black"
                mode="contained"
                onPress={() => {
                  router.push("/(tabs)/home");
                }}
              >
                Skip
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    height: "100%",
    width: "100%",
  },
  container: {
    flexDirection: "column",
    borderRadius: 5,
    height: "100%",
    justifyContent: "space-between",
    width: "100%",
    gap: 5,
  },
});
