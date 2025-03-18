// app/(tabs)/(chat)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack
    
      screenOptions={{
        headerShown: false, // Desactiva el header propio del chat
      }}
    >
      {/* Esta pantalla se corresponde con (chat)/index.tsx */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
