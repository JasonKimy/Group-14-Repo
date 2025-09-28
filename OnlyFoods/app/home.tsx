import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import db from '../database/database';
import { getUserId, removeUserId } from "@/sessions/auth";

import { FontAwesome } from '@expo/vector-icons';


export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

 // run npx expo install @react-native-async-storage/async-storage

 useEffect(() => {
  const loadUserId = async () => {
    const storedUserId = await getUserId();
    setUserId(storedUserId);
  };
  loadUserId();
 }, []);

  const checkUsers = async () => {
    try{
      const database = await db;
      const result = await database.getAllAsync('SELECT * FROM users');
      console.log('Users check:', result);
    } catch(error){
      console.error('Error checking users:', error);
    }
  }

  const handleSearch = () => {
    if(query.trim().length > 0 && userId){
      router.push({
        pathname: "./recipeSearched",
        params: { query }
      });
    }
  };

  const handleLogout = async () =>{
    await removeUserId();
    setUserId(null);
    router.push('/')
  }


{/* if (userId === null){
    return (
      <View style={styles.container}>
        <Text style={styles.header}>OnlyFoods 🍲</Text>
        <Text style={styles.message}>Login to continue</Text>
        <Button title="Go To Login" onPress={() => router.push('/')} />
      </View>
    )
  } */}

    return (
      <View style={styles.container}>
        {/* header with title and user icon*/}
        <Text style={styles.header}>OnlyFoods 🍲</Text>
        {userId && <Text style={styles.userInfo}>User ID: {userId}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Search recipes..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={handleSearch} />

        {/* Floating + button for adding recipe*/}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/recipeform")}
        >
          <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Floating user icon at bottom-left */}
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => router.push("/about")}
      >
        <FontAwesome name="user-circle" size={32} color="#4CAF50" />
      </TouchableOpacity>

      {/*logout button*/}
      <Button title = "Logout" onPress={handleLogout} />
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
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: "white",
  },
  userButton: {
    position: "absolute",
    bottom: 30,
    left: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
