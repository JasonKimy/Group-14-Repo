import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
//import { getUserProfile, saveUserProfile } from "../../OnlyFoods/database/database.js"; 
import { useRouter } from "expo-router";

const getUserProfile = async () => {
    // return fake data
    return {
      name: "Jane Doe",
      description: "I love cooking!",
      favoriteFood: "Pizza",
      photo: null,
    };
  };

  const saveUserProfile = async (profile: any) => {
    console.log("Saving profile (stub):", profile);
    alert("Profile saved (stub)!");
    return true;
  };

export default function AboutUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Load existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getUserProfile(); // expects object { name, description, favoriteFood, photo }
      if (user) {
        setName(user.name);
        setDescription(user.description);
        setFavoriteFood(user.favoriteFood);
        setPhoto(user.photo);
      }
    };
    fetchProfile();
  }, []);

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
    await saveUserProfile({ name, description, favoriteFood, photo });
    alert("Profile saved!");
    router.push("/"); // optional: navigate to Home after save
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={{ fontSize: 32, color:"#ff0000" }}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Short description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Favorite Food"
        value={favoriteFood}
        onChangeText={setFavoriteFood}
        style={styles.input}
      />

      <Button title="Save Profile" onPress={handleSave} />
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
    marginBottom: 20,
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
  
});
