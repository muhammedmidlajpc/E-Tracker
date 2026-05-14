import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { initDb } from "@/lib/local_storage/db";

export default function RootLayout() {
  useEffect(() => {
    initDb();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
