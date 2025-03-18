// app/components/Chatbutton.tsx
import { Link } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

export default function FloatingChatButton() {
  return (
    <Link href="/(tabs)/(chat)" asChild>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="chat" size={24} color="white" />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: "#2F5A1E",
    padding: 15,
    borderRadius: 30,
    zIndex: 1000,
  },
});
