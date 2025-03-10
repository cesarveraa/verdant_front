import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bug, Plus, Camera } from "lucide-react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import React from "react";

const PESTS = [
  {
    id: "1",
    name: "Aphids",
    image: "https://images.unsplash.com/photo-1626548307930-deac221f87d9",
    status: "Crop Pest",
    affectedCrop: "Rice crop",
    elimination: "Insecticidal soap, Neem oil",
    notes: "Recorded twice in rice and onion crop",
  },
  {
    id: "2",
    name: "Corn earworm",
    image: "https://images.unsplash.com/photo-1626548307930-deac221f87d9",
    status: "Crop Pest",
    affectedCrop: "Corn",
    elimination: "Bacillus thuringiensis, Spinosad",
    notes: "Frequently Recorded in Crops of: Corn and Tomato",
  },
];

export default function PestsScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const menuPosition = useRef(new Animated.Value(height)).current;
  const [buttonScale] = useState(new Animated.Value(1));

  const [cropType, setCropType] = useState("");
  const [pestType, setPestType] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const toggleMenu = () => {
    Animated.spring(menuPosition, {
      toValue: menuVisible ? height : 0,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setMenuVisible(!menuVisible);
  };


  const handlePan = (event: PanGestureHandlerGestureEvent) => {
    const { nativeEvent } = event;
    if (nativeEvent.translationY > 0) {
      menuPosition.setValue(nativeEvent.translationY + (menuVisible ? 0 : height));
    }
  };
  
  const handlePanEnd = (event: PanGestureHandlerGestureEvent) => {
    const { nativeEvent } = event;
    if (nativeEvent.translationY > 100) {
      toggleMenu();
    } else {
      Animated.spring(menuPosition, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };
  

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting:", { cropType, pestType, image });
    toggleMenu(); // Cierra el menú después de guardar
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Botón flotante */}
        <Animated.View style={[styles.addButton, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons
              name={menuVisible ? 'close' : 'add'}
              size={28}
              color="#FFF"
            />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.header}>
          <Text style={styles.title}>Pest Directory</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {PESTS.map((pest) => (
            <View key={pest.id} style={styles.card}>
              <Image source={{ uri: pest.image }} style={styles.pestImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <Text style={styles.pestName}>{pest.name}</Text>
                <Text style={styles.statusText}>Status: {pest.status}</Text>
                <Text style={styles.cropText}>Affected Crop: {pest.affectedCrop}</Text>
                <Text style={styles.eliminationText}>Elimination: {pest.elimination}</Text>
                <Text style={styles.notesText}>{pest.notes}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Menú deslizante */}
        <PanGestureHandler
          onGestureEvent={handlePan}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) handlePanEnd({ nativeEvent });
          }}
        >
          <Animated.View style={[styles.slideUpMenu, { transform: [{ translateY: menuPosition }] }]}>
            <View style={styles.dragHandle}>
              <View style={styles.dragIndicator} />
            </View>

            <Text style={styles.menuTitle}>Report New Pest</Text>

            <ScrollView 
              style={styles.menuContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.form}>
                {/* Campo Tipo de Cultivo */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Crop Type</Text>
                  <TextInput
                    style={styles.input}
                    value={cropType}
                    onChangeText={setCropType}
                    placeholder="Ej: Maíz, Trigo..."
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Campo Tipo de Plaga */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Pest Type</Text>
                  <TextInput
                    style={styles.input}
                    value={pestType}
                    onChangeText={setPestType}
                    placeholder="Ej: Pulgón, Gusano..."
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Selector de Imagen */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Pest Image</Text>
                  <TouchableOpacity 
                    style={styles.imageButton} 
                    onPress={handleImagePick}
                  >
                    <Camera size={20} color="#2B4D2D" />
                    <Text style={styles.imageButtonText}>
                      {image ? "Cambiar imagen" : "Tomar foto"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Vista previa de imagen */}
                {image && (
                  <Image 
                    source={{ uri: image }} 
                    style={styles.previewImage} 
                  />
                )}

                {/* Botones de acción */}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Save Report</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={toggleMenu}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7F2" },
  header: {
    padding: 20,
    backgroundColor: "#2B4D2D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#ffffff" },
  scrollView: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  pestImage: { width: "100%", height: 200 },
  cardContent: { padding: 16 },
  pestName: { fontSize: 20, fontWeight: "bold", color: "#2B4D2D", marginBottom: 8 },
  statusText: { fontSize: 16, color: "#666", marginBottom: 4 },
  cropText: { fontSize: 16, color: "#666", marginBottom: 4 },
  eliminationText: { fontSize: 16, color: "#666", marginBottom: 4 },
  notesText: { fontSize: 14, color: "#888", fontStyle: "italic", marginTop: 8 },
  addButton: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 25,
    bottom: 10,
    backgroundColor: '#9DC88D',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  slideUpMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "#F8FAF5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    zIndex: 999,
  },
  dragHandle: {
    alignItems: "center",
    marginBottom: 16,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#CBD5E1",
    borderRadius: 2,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2B4D2D",
    textAlign: "center",
    marginBottom: 20,
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B4D2D",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAF5",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#2B4D2D",
    borderWidth: 1,
    borderColor: "#E2E8E0",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAF5",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2B4D2D",
  },
  imageButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#2B4D2D",
    fontWeight: "500",
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 12,
    resizeMode: "cover",
  },
  buttonGroup: {
    marginTop: 20,
    gap: 12,
  },
  submitButton: {
    backgroundColor: "#9DC88D",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#2B4D2D",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8E0",
  },
  cancelButtonText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});