import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import db from '../database/database';
import { saveUserId } from '../sessions/auth';

export default function CreateAccountScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const createUser = async (username: string, password: string) => {
    try {
      const database = await db;
      await database.runAsync(
        'INSERT INTO users (username, password) VALUES (?,?)',
        [username, password]
      );
      return true;
    } catch (error: any) {
      console.error('Error with create:', error);
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        Alert.alert('Error', 'Userame taken. Choose a different account name.');
      } else {
        Alert.alert('Error', 'Unable to create account. Try again.');
      }
      return false;
    }
  };

  const handleCreateAccount = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Fill out all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 5) {
      Alert.alert('Error', 'Password must be at least 5 characters');
      return;
    }

    const success = await createUser(username, password);

    if(success){
        try{
            const database = await db;
            const user = await database.getFirstAsync(
                'SELECT id FROM users WHERE username = ?',
                [username]
            ) as { id: number} | null;
            if (user){
              await saveUserId(user.id);
                Alert.alert('Success', 'Account created', [
                    {
                    text: 'Ok',
                    onPress: () => router.push(`/home`)
                    }
                ]);
            }
        } catch (error){
            console.error('Error getting userId:', error);
            router.push('/home');
        }

    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <Text style={styles.headerRouteTitle}>Sign UP</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#8A8A8E"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8A8A8E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#8A8A8E"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryBtn} onPress={handleCreateAccount}>
            <Text style={styles.primaryBtnText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, styles.spaced]}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryBtnText}>Login</Text>
          </TouchableOpacity>
        </View>

        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerRouteTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  primaryBtn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB', 
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5FF', 
    borderWidth: 1,
    borderColor: '#C7DBFF',
  },
  secondaryBtnText: {
    color: '#1D4ED8', 
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  spaced: {
    marginTop: 12,
  },
  footerNote: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 12,
  },
});
