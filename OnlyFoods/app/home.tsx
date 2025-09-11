import React, { useState } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import db from '../database/database';

export default function Home() {
  const router = useRouter();

  const checkUsers = async () => {
    try{
      const database = await db;
      const result = await database.getAllAsync('SELECT * FROM users');
      console.log('Users check:', result);
    } catch(error){
      console.error('Error checking users:', error);
    }
  }
  const [query, setQuery] = useState("");
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
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
});
