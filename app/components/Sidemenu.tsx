import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";

export default function SideMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    // Animamos la opacidad del overlay de 0 a 1 (o viceversa)
    Animated.timing(overlayOpacity, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible));
  };

  return (
    <>
      {/* Botón para abrir/cerrar el menú */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={toggleMenu}
      >
        <MaterialIcons name="menu" size={30} color="#2F5A1E" />
      </TouchableOpacity>

      {/* Solo renderizamos el overlay y el contenido cuando el menú está visible */}
      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          {/* Área para detectar toques fuera del menú y cerrar */}
          <TouchableOpacity 
            style={styles.closeArea} 
            onPress={toggleMenu}
            activeOpacity={1}
          >
            <View style={styles.menuContent}>
              <Text style={styles.sectionTitle}>@Username</Text>
              {['Home', 'Crops', 'Statistics', 'Chat Bot', 'Settings'].map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={styles.menuItem}
                  onPress={() => console.log(item)}
                >
                  <Text style={styles.menuItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.separator} />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add new crop</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    left: 20,
    top: 60, // Ajustado para dispositivos modernos
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
  closeArea: {
    flex: 1,
    flexDirection: "row",
  },
  menuContent: {
    width: 280,
    height: "100%",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
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
