import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Image, Linking, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // <— add this

export default function Index() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter(); // <— add this

  // Hardcoded keys (safe for testing, but don't publish with these!)
  const RECIPE_APP_ID = "e0faa018";
  const RECIPE_APP_KEY = "ca768e7ebae1b85849eb64bb6cbc0e4d";

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`
      );
      const data = await response.json();
      console.log("API response:", data); 
      setRecipes(data.hits || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* New: quick button to go Home */}
      <View style={{ alignSelf: "flex-end", marginBottom: 8 }}>
        <Button title="Go to Home" onPress={() => router.push("/home")} />
      </View>

      <Text style={styles.header}>OnlyFoods 🍲</Text>

      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={getRecipes} />

      <FlatList
        data={recipes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.recipe.label}</Text>
            <Image source={{ uri: item.recipe.image }} style={styles.image} />
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(item.recipe.url)}
            >
              View Recipe
            </Text>
          </View>
        )}
      />
    </View>
  );
}


//this was missing, but it was in someone else old commit I just added it back
//you can remove it if you've change the design I just have it so the app doesn't crash
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  card: { marginBottom: 20, padding: 10, borderWidth: 1, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  image: { width: "100%", height: 150, borderRadius: 10, marginTop: 5 },
  link: { color: "blue", marginTop: 5 }
});
