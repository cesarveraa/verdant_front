import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Thermometer, Droplets, Sun, Calendar } from 'lucide-react-native';
import React from 'react';

const CROPS = [
  {
    id: '1',
    name: 'Corn',
    image: 'https://images.unsplash.com/photo-1601472544834-b4663c12e2e9',
    environmentalConditions: {
      humidity: '80%',
      temperature: '18°C',
      precipitation: '1200 mm',
      sunlight: '6 hours/day',
    },
    cropStatus: {
      height: '1.8 meters',
      stage: 'Flowering phase',
      density: '50,000 plants/hectare',
    },
  },
  {
    id: '2',
    name: 'Onion',
    image: 'https://images.unsplash.com/photo-1618512496248-a01f4a1a4b1a',
    environmentalConditions: {
      humidity: '65%',
      temperature: '22°C',
      precipitation: '800 mm',
      sunlight: '8 hours/day',
    },
    cropStatus: {
      height: '0.4 meters',
      stage: 'Growing phase',
      density: '150,000 plants/hectare',
    },
  },
  {
    id: '3',
    name: 'Wheat',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b',
    environmentalConditions: {
      humidity: '70%',
      temperature: '20°C',
      precipitation: '900 mm',
      sunlight: '7 hours/day',
    },
    cropStatus: {
      height: '0.9 meters',
      stage: 'Maturation phase',
      density: '220,000 plants/hectare',
    },
  },
];

export default function CropDetailsScreen() {
  const { id } = useLocalSearchParams();
  const crop = CROPS.find((c) => c.id === String(id));

  if (!crop) {
    return (
      <View style={styles.container}>
        <Text>Crop not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: crop.image }} style={styles.mainImage} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.cropName}>{crop.name}</Text>
          <Text style={styles.stage}>{crop.cropStatus.stage}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Conditions</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Thermometer size={24} color="#2B4D1B" />
              <Text style={styles.statValue}>{crop.environmentalConditions.temperature}</Text>
              <Text style={styles.statLabel}>Temperature</Text>
            </View>
            <View style={styles.statItem}>
              <Droplets size={24} color="#2B4D1B" />
              <Text style={styles.statValue}>{crop.environmentalConditions.humidity}</Text>
              <Text style={styles.statLabel}>Humidity</Text>
            </View>
            <View style={styles.statItem}>
              <Sun size={24} color="#2B4D1B" />
              <Text style={styles.statValue}>{crop.environmentalConditions.sunlight}</Text>
              <Text style={styles.statLabel}>Sunlight</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar size={24} color="#2B4D1B" />
              <Text style={styles.statValue}>{crop.environmentalConditions.precipitation}</Text>
              <Text style={styles.statLabel}>Precipitation</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crop Status</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Height</Text>
              <Text style={styles.statusValue}>{crop.cropStatus.height}</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Plant Density</Text>
              <Text style={styles.statusValue}>{crop.cropStatus.density}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  cropName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B4D1B',
    marginBottom: 8,
  },
  stage: {
    fontSize: 18,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B4D1B',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: '40%',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B4D1B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  statusGrid: {
    gap: 16,
  },
  statusItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#666666',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B4D1B',
  },
});