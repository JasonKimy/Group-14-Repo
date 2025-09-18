import React, { useState } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import db from '../database/database';

export default function Home() {
  const router = useRouter();

  //mock sessions just to test that favorite recipe works, send userId to
  //every file
  const { userId } = useLocalSearchParams<{ userId: string }>();

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
        params: { query, userId },
      });
    }
  };

    return (
      <View style={styles.container}>
        <Text style={styles.header}>OnlyFoods 🍲</Text>
        {userId && <Text style={styles.userInfo}>User ID: {userId}</Text>}
  
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
  userInfo: {
    fontSize: 14,
    color: "665",
    marginBottom:16,
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
