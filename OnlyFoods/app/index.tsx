import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [query, setQuery] = useState("");
  const router = useRouter();

const handleSearch = () => {
  if (query.trim().length > 0) {
    router.push({
      pathname: "./recipeSearched",
      params: { query },
    });
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>OnlyFoods 🍲</Text>

      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
});
