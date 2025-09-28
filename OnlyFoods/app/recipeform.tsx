//app/recipeform.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RecipeForm() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState('');

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    setShowPicker(Platform.OS === 'ios'); 
    if (selectedTime) setTime(selectedTime);
  };

  const handleSubmit = () => {
    const recipeData = {
      name,
      ingredients,
      instructions,
      category,
      time: time.toLocaleTimeString(), //save/display as string
      image,
    };
    console.log('Submitted Recipe:', recipeData);
    alert('Recipe submitted! (stub)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Own Recipe</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Select Time" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onChangeTime}
        />
      )}
      <Text>Selected Time: {time.toLocaleTimeString()}</Text>

      <TextInput
        style={styles.input}
        placeholder="Image URL"
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
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
});
