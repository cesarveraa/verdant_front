import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";

export default function AddPestMenu({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [cropType, setCropType] = useState("");
  const [pestType, setPestType] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { height } = Dimensions.get("window");
  const slideAnimation = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: isVisible ? 0 : height,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [isVisible]);

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
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <Animated.View style={[styles.slideUpMenu, { transform: [{ translateY: slideAnimation }] }]}>
      <View style={styles.dragHandle}>
        <View style={styles.dragIndicator} />
      </View>

      <Text style={styles.title}>Report New Pest</Text>

      <ScrollView 
        style={styles.content}
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
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slideUpMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "55%",
    backgroundColor: "#F8FAF5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2B4D2D",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
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
});