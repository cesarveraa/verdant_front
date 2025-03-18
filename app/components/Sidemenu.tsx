import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function SideMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const menuTranslateX = useRef(new Animated.Value(-280)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      // Cerrar
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(menuTranslateX, {
          toValue: -280,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      // Abrir
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(menuTranslateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <>
      {/* Botón para abrir/cerrar el menú */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <MaterialIcons name="menu" size={30} color="#2F5A1E" />
      </TouchableOpacity>

      {menuVisible && (
        <>
          {/* Overlay para cerrar al tocar afuera */}
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </TouchableWithoutFeedback>

          {/* Menú lateral animado */}
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: menuTranslateX }] },
            ]}
          >
            <View style={styles.menuContent}>
              <Text style={styles.sectionTitle}>@Username</Text>

              {/* Botón literal: Home */}
              <Link href="/home" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuItemText}>Home</Text>
                </TouchableOpacity>
              </Link>

              {/* Botón literal: Crops */}
              <Link href="/pests" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuItemText}>Crops</Text>
                </TouchableOpacity>
              </Link>

              {/* Botón literal: Statistics -> Dashboard */}
              <Link href="/(tabs)/(dashboard)" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuItemText}>Statistics</Text>
                </TouchableOpacity>
              </Link>

              {/* Botón literal: Chat Bot */}
              <Link href="/chat" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuItemText}>Chat Bot</Text>
                </TouchableOpacity>
              </Link>

              {/* Botón literal: Settings */}
              <Link href="/settings" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => toggleMenu()}
                >
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
              </Link>

              <View style={styles.separator} />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add new crop</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    left: 20,
    top: 60,
    zIndex: 1001,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
  menuContainer: {
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
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
    marginHorizontal: 15,
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
});
