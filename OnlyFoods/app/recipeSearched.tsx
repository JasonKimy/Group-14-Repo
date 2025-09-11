import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Linking, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const RECIPE_APP_ID = "e0faa018";
const RECIPE_APP_KEY = "ca768e7ebae1b85849eb64bb6cbc0e4d";

export default function RecipeSearched() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        console.error("API returned an error:", text);
        setRecipes([]);
        return;
      }

      const data = await response.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error("Fetch failed:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };
  fetchRecipes();
}, [query]);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No recipes found for "{query}"</Text>
        <Text style={styles.link} onPress={() => router.back()}>
          ← Back
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results for "{query}"</Text>

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
              View Original Recipe
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FFF9BD" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#A3DC9A",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  image: { width: 200, height: 200, borderRadius: 8, marginBottom: 8 },
  link: { color: "#190097ff", textDecorationLine: "underline", marginTop: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
