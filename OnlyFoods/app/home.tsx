import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import db from "../database/database";
import { getUserId, removeUserId } from "@/sessions/auth";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [hiddenQuery, setHiddenQuery] = useState(""); // 👈 added

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await getUserId();
      setUserId(storedUserId);
    };
    loadUserId();
  }, []);

  const checkUsers = async () => {
    try {
      const database = await db;
      const result = await database.getAllAsync("SELECT * FROM users");
      console.log("Users check:", result);
    } catch (error) {
      console.error("Error checking users:", error);
    }
  };

  const handleSearch = () => {
    if (query.trim().length > 0 && userId) {
      const fullQuery = [query.trim(), hiddenQuery.trim()].filter(Boolean).join(" "); // 👈 combine
      router.push({
        pathname: "./recipeSearched",
        params: { query: fullQuery }, // 👈 pass combined query
      });
    }
  };

  const handleLogout = async () => {
    await removeUserId();
    setUserId(null);
    router.push("/");
  };

  if (userId === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>OnlyFoods 🍲</Text>
        <Text style={styles.message}>Login to continue</Text>
        <Button title="Go To Login" onPress={() => router.push("/")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OnlyFoods 🍲</Text>
      {userId && <Text style={styles.userInfo}>User ID: {userId}</Text>}

      {/**/}
      <View style={{ width: "100%", marginBottom: 12 }}>
        <FilterBar onHiddenQueryChange={(hidden) => setHiddenQuery(hidden)} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      <View style={styles.buttonContainer}>
        <Button title="Profile" onPress={() => router.push("/about")} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  userInfo: {
    fontSize: 14,
    color: "#665",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
});
