// app/(tabs)/(dashboard)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        // Oculta un header adicional; así usas solo el Navbar global
        headerShown: false,
      }}
    >
      {/* name="index" -> corresponde a (dashboard)/index.tsx */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
