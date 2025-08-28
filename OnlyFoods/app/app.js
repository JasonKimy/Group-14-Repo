//This file current does nothing. Indext.tsx is the default front page at the moment
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Welcome to OnlyFoods!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
