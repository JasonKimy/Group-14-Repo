import React from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>OnlyFoods</Text>
        <Text style={styles.subtitle}>Welcome! Do you want food :p</Text>

        <View style={styles.buttons}>
          <Button title="Start Searching" onPress={() => router.push("/")} />
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
