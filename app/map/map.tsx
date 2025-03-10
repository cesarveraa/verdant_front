import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';
import React from 'react';

interface Field {
  id: string;
  name: string;
  crop: string;
  size: number;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  color: string;
}

const SAMPLE_FIELDS: Field[] = [
  {
    id: '1',
    name: 'North Field',
    crop: 'Wheat',
    size: 2.0,
    coordinates: [
      { latitude: 51.5074, longitude: -0.1278 },
      { latitude: 51.5084, longitude: -0.1278 },
      { latitude: 51.5084, longitude: -0.1268 },
      { latitude: 51.5074, longitude: -0.1268 },
    ],
    color: 'rgba(255, 193, 7, 0.3)',
  },
  {
    id: '2',
    name: 'South Field',
    crop: 'Corn',
    size: 1.5,
    coordinates: [
      { latitude: 51.5064, longitude: -0.1278 },
      { latitude: 51.5074, longitude: -0.1278 },
      { latitude: 51.5074, longitude: -0.1268 },
      { latitude: 51.5064, longitude: -0.1268 },
    ],
    color: 'rgba(76, 175, 80, 0.3)',
  },
];

export default function MapScreen() {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton>
        {SAMPLE_FIELDS.map((field) => (
          <Polygon
            key={field.id}
            coordinates={field.coordinates}
            fillColor={field.color}
            strokeColor={field.color.replace('0.3', '1')}
            strokeWidth={2}
            tappable
            onPress={() => setSelectedField(field)}
          />
        ))}
      </MapView>

      {selectedField && (
        <BlurView intensity={70} style={styles.fieldDetails}>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldName}>{selectedField.name}</Text>
            <Text style={styles.fieldInfo}>
              Crop: {selectedField.crop}
            </Text>
            <Text style={styles.fieldInfo}>
              Size: {selectedField.size} hectares
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedField(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  fieldDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  fieldContent: {
    padding: 20,
  },
  fieldName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F5A1E',
    marginBottom: 10,
  },
  fieldInfo: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2F5A1E',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});