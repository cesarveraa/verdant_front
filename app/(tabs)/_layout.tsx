// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Home, MapPin, Bug } from "lucide-react-native";
import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Navbar from "../components/Navbar";
import FloatingChatButton from "../components/Chatbutton";

export default function TabsLayout() {
  // Usaremos translateX para animar el sidebar de -280 (oculto) a 0 (visible)
  const [menuVisible, setMenuVisible] = useState(false);
  const menuTranslateX = useRef(new Animated.Value(-280)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      // Cerrar: de 0 a -280
      Animated.timing(menuTranslateX, {
        toValue: -280,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      // Abrir: de -280 a 0
      Animated.timing(menuTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Navbar fijo en la parte superior */}
      <View style={styles.navbarContainer}>
        <Navbar toggleMenu={toggleMenu} />
      </View>

      {/* Contenido principal con margen superior para no quedar tapado por el Navbar */}
      <View style={{ marginTop: 60, flex: 1 }}>
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#2F5A1E",
            tabBarInactiveTintColor: "#666666",
            tabBarStyle: { backgroundColor: "#FFFFFF" },
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
          <Tabs.Screen name="(chat)" options={{ href: null }} /> {/* Ocultar completamente */}
          <Tabs.Screen name="(dashboard)" options={{ href: null }} /> {/* Ocultar completamente */}

          <Tabs.Screen name="map" options={{ title: "Map" }} />
          <Tabs.Screen name="home" options={{ title: "Home" }} />
          <Tabs.Screen name="pests" options={{ title: "Pests" }} />


          


        </Tabs>
      </View>

      {/* Sidebar único: se renderiza si menuVisible es true */}
      {menuVisible && (
        <>
          {/* Overlay para cerrar el menú al tocar fuera */}
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          {/* Sidebar animado */}
          <Animated.View
            style={[
              styles.sideMenu,
              { transform: [{ translateX: menuTranslateX }] },
            ]}
          >
            <SideMenuContent />
          </Animated.View>
        </>
      )}

      {/* Botón de chat flotante */}
      <FloatingChatButton />
    </GestureHandlerRootView>
  );
}

function SideMenuContent() {
  return (
    <View style={styles.menuContent}>
      <View style={styles.menuHeader}>
        <Animated.Text style={styles.sectionTitle}>@Username</Animated.Text>
      </View>
      {["Home", "Crops", "Statistics", "Chat Bot", "Settings"].map(
        (item) => (
          <TouchableWithoutFeedback key={item}>
            <View style={styles.menuItem}>
              <Animated.Text style={styles.menuItemText}>{item}</Animated.Text>
            </View>
          </TouchableWithoutFeedback>
        )
      )}
      <View style={styles.separator} />
      <Animated.Text style={styles.sectionTitle}>Quick Actions</Animated.Text>
      <TouchableWithoutFeedback>
        <View style={styles.addButton}>
          <Animated.Text style={styles.addButtonText}>
            + Add new crop
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1002,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1001,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    backgroundColor: "#FFF",
    zIndex: 1002,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  menuContent: {
    flex: 1,
  },
  menuHeader: {
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B4D1B",
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#F8FCF8",
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemText: {
    color: "#333",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  addButton: {
    backgroundColor: "#F5FFF5",
    margin: 15,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0F0E0",
  },
  addButtonText: {
    color: "#2B4D1B",
    fontWeight: "500",
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
    marginHorizontal: 15,
  },
});
