import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import FloatingChatButton from "../../components/Chatbutton";
import SideMenu from "../../components/Sidemenu";

export default function PestsLayout() {
  return (
    <View style={{ flex: 1 }}>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="pests" />
      </Stack>
     
    </View>
  );
}
