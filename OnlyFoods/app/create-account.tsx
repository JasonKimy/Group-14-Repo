import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import db from '../database/database';

export default function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const createUser = async (username: string, password: string) => {
    try{
        const database = await db;
        await database.runAsync(
            'INSERT INTO users (username, password) VALUES (?,?)',
            [username, password]
        );
        return true;
    }catch (error:any){
        console.error('Error with create:', error);
        if(error.message && error.message.includes('UNIQUE constraint failed')){
            Alert.alert('Error', 'Userame taken. Choose a different account name.');
        } else{
            Alert.alert('Error', 'Unable to create account. Try again.');
        }
        return false;
    }
  };

  const handleCreateAccount = async () => {
    if(!username || !password || !confirmPassword){
        Alert.alert('Error', 'Fill out all fields');
        return;
    }

    if (password != confirmPassword){
        Alert.alert('Error', 'Passwords do not match');
        return;
    }

    if(password.length < 5){
        Alert.alert('Error', 'Password must be at least 5 characters');
        return;
    }

    const success = await createUser(username, password);
    if(success){
        Alert.alert('Success', 'Account created', [
            {
            text: 'Ok',
            onPress: () => router.push('/home')
            }
        ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Create Account </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
       />
      
      <Button title="Create Account" onPress={handleCreateAccount} />

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#333'
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal:15,
      marginBottom: 20,
      backgroundColor: '#f9f9f9',
      fontSize: 16,
    },
  });