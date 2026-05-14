import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Card } from "./model";
import { Dropdown } from "react-native-element-dropdown";
import { addExpense } from "@/lib/local_storage/services";
import { useRouter } from "expo-router";

export default function AddCard() {
  const [card, setCard] = useState<Card>({
    custom_name: "",
    date: "",
    title: "",
    amount: 0,
    type: "",
  });
  const [date, setdate] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      if (!card.title || !card.amount || !card.type || !card.date) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }
      await addExpense(
        card.title,
        card.amount,
        card.type,
        card.date,
        card.custom_name ?? "",
      );
      setCard({
        custom_name: "",
        date: "",
        title: "",
        amount: 0,
        type: "",
      });

      setdate("");
      Alert.alert("Success", "Expense card added successfully");
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const typeOptions = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ];
  {
    console.log(card.type);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 p-5 px-10 gap-3">
          <Text className="text-xl">Create New Expense Card</Text>

          <View>
            <TextInput
              label="Add Custom Name (Optional)"
              value={card.custom_name}
              mode="outlined"
              onChangeText={(name) =>
                setCard((prev) => ({ ...prev, custom_name: name }))
              }
            />
          </View>
          <View className="rounded-sm p-3.5 px-4 bg-white shadow-sm border">
            <Pressable onPress={() => setOpen(true)}>
              <Text className="text-black">
                {date
                  ? new Date(date).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })
                  : "Select Date"}
              </Text>
            </Pressable>
            {open && (
              <DateTimePicker
                value={date ? new Date(date) : new Date()}
                mode="date"
                display="inline"
                onChange={(_, selectedDate) => {
                  if (selectedDate) {
                    setdate(selectedDate.toISOString());
                    setCard((prev) => ({
                      ...prev,
                      date: selectedDate.toISOString(),
                    }));
                  }
                  setOpen(false);
                }}
              />
            )}
          </View>
          <View>
            <Text>Select Income or Expense</Text>
            <Dropdown
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 50,
                marginTop: 5,
                backgroundColor: "#fff",
              }}
              data={typeOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Type"
              value={card.type}
              onChange={(type) => {
                setCard((prev) => ({ ...prev, type: type.value }));
              }}
            />
          </View>
          <View className="flex gap-3">
            <Text>{`Add ${card.type.toUpperCase() || "Income / Expense"}`}</Text>
            <TextInput
              label="Source"
              mode="outlined"
              value={card.title}
              onChangeText={(source) => {
                setCard((prev) => ({ ...prev, title: source }));
              }}
            />
            <TextInput
              label="Amount"
              mode="outlined"
              value={card.amount.toString()}
              keyboardType="numeric"
              onChangeText={(amount) => {
                setCard((prev) => ({ ...prev, amount: Number(amount) }));
              }}
            />
          </View>
          <Button mode="contained" onPress={handleSubmit}>
            Add Expense Card
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
