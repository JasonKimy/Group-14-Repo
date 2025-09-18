import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Linking, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { insertFavoriteRecipe } from '../database/database';
import db from '../database/database';

//may have to update expo with npx expo install --fix

const RECIPE_APP_ID = "e0faa018";
const RECIPE_APP_KEY = "ca768e7ebae1b85849eb64bb6cbc0e4d";

export default function RecipeSearched() {
  const { query, userId } = useLocalSearchParams<{ query: string, userId: string }>();
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

//Saves favorite recipe, but may need to change the apiRecipeId to be accurate
const handleLikeRecipe = async (recipe: any) => {
  if(!userId){
    Alert.alert("Error", "User not logged in");
    return;
  }
  const apiRecipeId = recipe.recipe.uri;
  const recipeTitle = recipe.recipe.label;
  const userIdNum = parseInt(userId);

  const success = await insertFavoriteRecipe(userIdNum, apiRecipeId, recipeTitle);
  if (success) {
    Alert.alert("Success", "Recipe added to favorites!");

    //checks the favorites table to make sure everything is correctly displayed
    try {
      const database = await db;
      const favorites = await database.getAllAsync('SELECT * FROM favorite_recipes');
      console.log('Current favorites:', favorites);
  } catch (error) {
      console.error('Error checking favorites:', error);
  }
  }else {
    Alert.alert("Error", "Failed to save recipe");
  }
}


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
        <Text style={styles.link} onPress={() => router.push(`/home?userId={userId}`)}>
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

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLikeRecipe(item)}
              >
                <Text style={styles.likeButtonText}>Add to Favorites</Text>
              </TouchableOpacity>
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
  likeButton: { backgroundColor: "#FF6B6B", paddingHorizontal:20, paddingVertical:10, borderRadius: 25, marginTop: 10, elevation:2},
  likeButtonText: { color: "white", fontWeight: "bold", fontSize: 16, },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
