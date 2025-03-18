// app/(tabs)/home/_layout.tsx
import { Stack } from "expo-router";
import React from 'react';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen 
          name="home" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="[id]" 
          options={{ 
            headerShown: false,
            headerTitle: "Crop Details",
            headerStyle: { backgroundColor: '#2B4D1B' },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </View>
  );
}
