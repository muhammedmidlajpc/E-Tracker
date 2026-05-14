import { getExpenses } from "@/lib/local_storage/services";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Card } from "./model";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Home() {
  const [data, setdata] = useState<Card[]>([]);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const res = await getExpenses();
        setdata(res || []);
      };
      getData();
    }, []),
  );
  console.log(data, "data list");
  const cardList = (data: Card[]) => {
    const set = new Set();
    const card = {
      title: "",
      total: 0,
    };
    data.forEach((item) => {
      if (item.custom_name && item.custom_name.trim() !== "") {
        card.title = item.custom_name;
        card.total += item.amount;
        set.add(card);
      } else {
        const date = new Date(item.date);
        const month = date.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        });
        card.title = month;
        card.total += item.amount;
        set.add(card);
      }
    });
    return Array.from(set);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="p-5">
          <Text className="text-3xl text-center">2026</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
