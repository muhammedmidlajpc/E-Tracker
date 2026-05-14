import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

const db = SQLite.openDatabaseAsync("expenses.db");
export const getDb = async () => {
  return await db;
};
export const initDb = async () => {
  try {
    const database = await getDb();
    await database.execAsync(`
                CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                custom_name TEXT,
                amount REAL,
                type TEXT,
                date TEXT
                )`);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert("Something went wrong", error.message);
    } else {
      Alert.alert("Something went wrong", "Unknown error");
    }
  }
};
