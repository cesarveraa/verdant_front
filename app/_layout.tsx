import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Home, MapPin, Bug } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#2F5A1E",
          tabBarInactiveTintColor: "#666666",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
          },
          // Añadir esta condición para ocultar la pestaña index
          tabBarButton: route.name === "index" ? () => null : undefined,
          tabBarIcon: ({ focused, size, color }) => {
            let IconComponent;
            switch (route.name) {
              case "home":
                IconComponent = Home;
                break;
              case "map":
                IconComponent = MapPin;
                break;
              case "pests":
                IconComponent = Bug;
                break;
              default:
                return null;
            }
            return (
              <View
                style={{
                  backgroundColor: focused ? "#E5F5E5" : "transparent",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <IconComponent size={size} color={color} />
              </View>
            );
          },
        })}
      >
        {/* Orden correcto de pestañas */}
        <Tabs.Screen name="index" options={{ href: null }} /> {/* Ocultar completamente */}
        <Tabs.Screen name="map" options={{ title: "Map" }} />
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="pests" options={{ title: "Pests" }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}