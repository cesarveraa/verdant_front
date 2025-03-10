import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { PanGestureHandlerGestureEvent, HandlerStateChangeEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

type Crop = {
  id: string;
  name: string;
  image: string;
  environmentalConditions: {
    humidity: string;
    temperature: string;
    precipitation: string;
    sunlight: string;
  };
  cropStatus: {
    height: string;
    stage: string;
    density: string;
  };
};
const { width } = Dimensions.get("window");

const CROPS: Crop[] = [
  {
    id: "1",
    name: "Corn",
    image: "https://images.unsplash.com/photo-1601472544834-b4663c12e2e9",
    environmentalConditions: {
      humidity: "80%",
      temperature: "18°C",
      precipitation: "1200 mm",
      sunlight: "6 hours/day",
    },
    cropStatus: {
      height: "1.8 meters",
      stage: "Flowering phase",
      density: "50,000 plants/hectare",
    },
  },
  {
    id: "2",
    name: "Onion",
    image: "https://images.unsplash.com/photo-1618512496248-a01f4a1a4b1a",
    environmentalConditions: {
      humidity: "65%",
      temperature: "22°C",
      precipitation: "800 mm",
      sunlight: "8 hours/day",
    },
    cropStatus: {
      height: "0.4 meters",
      stage: "Growing phase",
      density: "150,000 plants/hectare",
    },
  },
  {
    id: "3",
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    environmentalConditions: {
      humidity: "70%",
      temperature: "20°C",
      precipitation: "900 mm",
      sunlight: "7 hours/day",
    },
    cropStatus: {
      height: "0.9 meters",
      stage: "Maturation phase",
      density: "220,000 plants/hectare",
    },
  },
];


export default function CropsScreen() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const menuPosition = useRef(new Animated.Value(height)).current;
  const [buttonScale] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const toggleMenu = () => {
    Animated.spring(menuPosition, {
      toValue: menuVisible ? height : height * 0.5,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const handlePan = (event: PanGestureHandlerGestureEvent) => {
    const { translationY } = event.nativeEvent;
    if (translationY > 0) {
      menuPosition.setValue(translationY + (menuVisible ? height * 0.5 : height));
    }
  };

  const handlePanEnd = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const { translationY } = event.nativeEvent;

    // Si el arrastre supera el 25% de la altura del menú, cerrar
    if (translationY > height * 0.125) {
      Animated.spring(menuPosition, {
        toValue: height,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(false);
      });
    } else {
      Animated.spring(menuPosition, {
        toValue: height * 0.5,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(true);
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TapGestureHandler
          numberOfTaps={2}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              toggleMenu();
            }
          }}
        >
          <View style={styles.gestureArea}>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.title}>Your Crops</Text>
              </View>

              {selectedCrop && (
                <View style={styles.selectedCropCard}>
                  <Image
                    source={{ uri: selectedCrop.image }}
                    style={styles.selectedCropImage}
                  />
                  <View style={styles.selectedCropInfo}>
                    <Text style={styles.cropTitle}>{selectedCrop.name}</Text>
                    <Text style={styles.cropDetail}>
                      🌡 Temp: {selectedCrop.environmentalConditions.temperature}
                    </Text>
                    <Text style={styles.cropDetail}>
                      💧 Humidity: {selectedCrop.environmentalConditions.humidity}
                    </Text>
                    <Text style={styles.cropDetail}>
                      ☀ Sunlight: {selectedCrop.environmentalConditions.sunlight}
                    </Text>
                    <Link href={`/home/${selectedCrop.id}`} asChild>
                      <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewButtonText}>View</Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              )}

              <View style={styles.grid}>
                {CROPS.map((crop) => (
                  <TouchableOpacity
                    key={crop.id}
                    style={styles.cropCard}
                    onPress={() => setSelectedCrop(crop)}
                  >
                    <Image source={{ uri: crop.image }} style={styles.cropImage} />
                    <Text style={styles.cropName}>{crop.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </TapGestureHandler>
        // En el return del componente CropsScreen, reemplaza la sección del botón por:
        // En el componente CropsScreen (dentro del return):
        <Animated.View style={[styles.notificationButton, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity
            onPress={() => {
              toggleMenu();
              animateButton();
            }}
          >
            <MaterialIcons
              name={menuVisible ? 'close' : 'notifications'}
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>
        </Animated.View>

        <PanGestureHandler
          onGestureEvent={handlePan}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) handlePanEnd({ nativeEvent } as any);
          }}
        >

          <Animated.View
            style={[
              styles.slideUpMenu,
              { transform: [{ translateY: menuPosition }] },
            ]}
          >
            <View style={styles.dragHandle}>
              <View style={styles.dragIndicator} />
            </View>
            <Text style={styles.menuTitle}>Notifications</Text>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Possibility of flooding in{" "}
                <Text style={styles.highlight}>rice crop</Text>
              </Text>
            </View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Pest update on <Text style={styles.highlight}>corn crop</Text>
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  gestureArea: { flex: 1, zIndex: 1 },
  header: { padding: 20, backgroundColor: "#2B4D1B" },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  grid: { flexDirection: "row", justifyContent: "space-around", padding: 16 },
  cropCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    width: "30%",
    alignItems: "center",
  },
// En los estilos:
notificationButton: {
  position: 'absolute',
  left: Dimensions.get('window').width / 2 - 25, // Centrado horizontal
  bottom: 10, // Justo encima de la barra inferior
  backgroundColor: '#2F5A1E',
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
  cropImage: { width: "100%", height: 80, borderRadius: 8 },
  cropName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2B4D1B",
    marginTop: 8,
    textAlign: "center",
  },
  selectedCropCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCropImage: { width: 120, height: 120, borderRadius: 8 },
  selectedCropInfo: { flex: 1, marginLeft: 16 },
  cropTitle: { fontSize: 18, fontWeight: "bold", color: "#2B4D1B" },
  cropDetail: { fontSize: 14, color: "#666" },
  viewButton: {
    backgroundColor: "#A4C639",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  slideUpMenu: {
    position: "absolute",
    width: "100%",
    height: "50%",
    backgroundColor: "#2F5A1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  menuTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  notification: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  notificationText: { fontSize: 14, color: "#2B4D1B" },
  highlight: { color: "#A4C639", fontWeight: "bold" },
  dragHandle: {
    alignItems: "center",
    marginTop: -10,
    marginBottom: 15,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
});