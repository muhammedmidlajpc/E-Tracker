import { Alert } from "react-native";
import { getDb } from "./db";
import { Card } from "@/app/(tabs)/model";

export const addExpense = async (
  title: string,
  amount: number,
  type: string,
  date: string,
  custom_name: string,
) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO expenses (title, amount, type, date, custom_name) VALUES (?, ?, ?, ?, ?)`,
      [title, amount, type, date, custom_name?.trim() || ""],
    );
    console.log("INSERT SUCCESS");
    Alert.alert("Success", "Expense added successfully");
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Something went wrong", error.message);
      console.log(error.message);
    } else {
      Alert.alert("Something went wrong", "Unknown error");
    }
  }
};

export const getExpenses = async (): Promise<Card[]> => {
  try {
    const db = await getDb();
    const expenses = await db.getAllAsync<Card>(`SELECT * FROM expenses`);
    return expenses;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Something went wrong", error.message);
    } else {
      Alert.alert("Something went wrong", "Unknown error");
    }
    return [];
  }
};

export const getByMonth = async (month: string) => {
  try {
    const db = await getDb();

    const expenses = await db.getAllAsync(
      "SELECT * FROM expenses WHERE strftime('%m', date) = ?",
      [month],
    );
    return expenses;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Something went wrong", error.message);
    } else {
      Alert.alert("Something went wrong", "Unknown error");
    }
  }
};

export const updateExpense = async (
  id: number,
  formValue: {
    title?: string;
    amount?: number;
    type?: string;
    date?: string;
  },
) => {
  try {
    const db = await getDb();
    const keys = Object.keys(formValue);
    const values = Object.values(formValue);
    const query = keys.map((key) => `${key}=?`).join(", ");
    await db.runAsync(
      `
    UPDATE expenses SET ${query} WHERE id=?
  `,
      [...values, id],
    );
    Alert.alert("Success", "Expense updated successfully");
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Updation Failed", error.message);
    } else {
      Alert.alert("Updation Failed", "Unknown error");
    }
  }
};

export const deleteExpense = async (id: number) => {
  try {
    const db = await getDb();
    await db.runAsync(`DELETE FROM expenses WHERE id=?`, [id]);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Deletion Failed", error.message);
    } else {
      Alert.alert("Deletion Failed", "Unknown error");
    }
  }
};

export const deleteAll = async () => {
  try {
    const db = await getDb();
    await db.runAsync(`DELETE FROM expenses`);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Deletion Failed", error.message);
    } else {
      Alert.alert("Deletion Failed", "Unknown error");
    }
  }
};
