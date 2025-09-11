import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>OnlyFoods</Text>
        <Text style={styles.subtitle}>Welcome! Do you want food :p</Text>

        <View style={styles.buttons}>
          <Button title="Start Searching" onPress={() => router.push("/")} />
        </View>


      //temporary spot for these two buttons
        <View style={styles.buttons}>
          <Button title="Create Account" onPress={() =>router.push("/create-account")} />
        </View>

      //checks if users from create-account are created
        <View style={styles.buttons}>
          <Button title="Check Users" onPress={checkUsers} />
        </View>

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: { fontSize: 32, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#6b7280", marginBottom: 16, textAlign: "center" },
  buttons: { width: "100%", gap: 12 },
  note: { marginTop: 18, color: "#9ca3af", fontSize: 12, textAlign: "center" },
});
