// app/login/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';
import db, { initDatabase } from '../../database/database.js';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(()=> {
    initDatabase();
  }, [])

  const handleLogin = async() => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    try{
      const database = await db;
      const result = await database.getAllAsync(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
      );

      if (result.length > 0){
        Alert.alert('Success', `Welcome, ${username}!`);
        router.push('/home');//redirect to home.tsx file located in Onlyfoods/app/home.tsx after login
      }else{
        Alert.alert('Error', 'Invalid username or password');
      }
    }catch(error){
      console.error('Login error', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> OnlyFoods!</Text>
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
      
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
