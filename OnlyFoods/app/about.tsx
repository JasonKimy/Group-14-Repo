import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet, FlatList, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getUserId } from "@/sessions/auth"; 
import { getUserProfile, updateUserProfile, loadFavorites } from "../database/database";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";


export default function AboutUser() {
  const router = useRouter();
  //const { userId } = useLocalSearchParams<{ userId: string }>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);


  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await getUserId();
      setUserId(storedUserId);
    };
    loadUserId();
   }, []);


  // Load existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        const user = await getUserProfile(userId);
        if (user) {
        setName(user.name || "");
        setDescription(user.bio || "");
        setFavoriteFood(user.favoriteFood || "");
        setPhoto(user.imageUrl || null);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      Alert.alert("Error", "Could not load profile.");
    }
    };
    fetchProfile();
  }, [userId]);

  const handleLoadFavorites = async () => {
    if(!userId) return;
    const favoriteRecipes = await loadFavorites(userId);
    setFavorites(favoriteRecipes);
  }

  // Pick photo from device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    console.log("Saving profile...", { name, description, favoriteFood, photo });
    try {
      const success = await updateUserProfile (name, description, photo, favoriteFood, userId);
      if (success) {
        Alert.alert("Success", "Profile saved!", [
          { text: "OK", onPress: () => router.push(`/home?userId=${userId}`) }
        ]
        );
      } else {
        Alert.alert("Error", "Could not save profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Could not save profile.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <TextInput
              placeholder="+"
              editable={false}
              style={{ fontSize: 32, color:"#ff0000" }}
              />
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Your Name"
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Short description"
        placeholderTextColor="#555"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Favorite Food"
        placeholderTextColor="#555"
        value={favoriteFood}
        onChangeText={setFavoriteFood}
        style={styles.input}
      />

      <Button title="Save Profile" onPress={handleSave} />

      <Button title={showFavorites ? "Hide Fvorites" : "Show Favorites"}
      onPress={() => {
        setShowFavorites(!showFavorites);
        if(!showFavorites) handleLoadFavorites();
      }} />

      {showFavorites && (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.recipe_title}</Text>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(item.recipe_url)}
                >
                  View Original Recipe
              </Text>
            </View>
          )}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  photo: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 20 
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#aaa",
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
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
  
});
