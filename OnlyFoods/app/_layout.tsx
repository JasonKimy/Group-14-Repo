import { Stack } from "expo-router";
import { initDatabase } from '../database/database';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        console.log('Database good');
      } catch(error) {
        console.error('Database didnt initialize', error);
      }
    };

    setupDatabase();
  }, []);



  return <Stack />;
}
