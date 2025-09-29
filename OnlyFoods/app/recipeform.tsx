//app/recipeform.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { insertRecipe } from '../database/database';


export default function RecipeForm() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async() => {
    const recipeData = {
      name,
      ingredients,
      instructions,
      category,
      duration,
      image,

    };

    console.log('Submitted Recipe:', recipeData);

    const success = await insertRecipe(
      name,
      ingredients,
      instructions,
      category,
      duration,
      image
    );

    if (success) {
      alert('Recipe saved!');
      setName('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setDuration('');
      setImage('');
    } else {
      alert('Failed to save recipe.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Own Recipe</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888" 
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        placeholderTextColor="#888"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Instructions"
        placeholderTextColor="#888"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#888"
        value={image}
        onChangeText={setImage}
      />

      <Button title="Save Recipe" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 15,
    color: '#000', 
  }
});
