import { Stack } from 'expo-router';
import React from 'react';

export default function CropsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: true,
          headerTitle: "Crop Details",
          headerStyle: {
            backgroundColor: '#2B4D1B',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}