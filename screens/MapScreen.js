import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// НОРМАЛЬНИЙ ІМПОРТ: тепер він не зламає веб, бо веб цей файл навіть не побачить!
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Header from '../components/Header';
import { COLORS } from '../theme/colors';

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState('Визначаємо...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Помилка', 'Доступ до геолокації заборонено.');
        setLoading(false);
        return;
      }

      try {
        let currentLoc = await Location.getCurrentPositionAsync({});
        setLocation(currentLoc.coords);

        let address = await Location.reverseGeocodeAsync({
          latitude: currentLoc.coords.latitude,
          longitude: currentLoc.coords.longitude
        });
        
        if (address.length > 0) {
          setCountry(address[0].country || 'Невідомий регіон');
        }
      } catch (error) {
        Alert.alert('Помилка', 'Не вдалося отримати локацію');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Сканування супутників...</Text>
        </View>
      ) : location ? (
        <View style={styles.content}>
          <Text style={styles.title}>📍 Радар гравців</Text>
          
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05, 
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Ваша ігрова база"
                description={country}
              />
            </MapView>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Регіон: {country}</Text>
            <Text style={styles.infoDesc}>
              Система автоматично застосує регіональні ціни та валюту для вашого місцезнаходження.
            </Text>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Назад до профілю</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Локація недоступна ❌</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15 },
  loadingText: { color: COLORS.textMuted, marginTop: 10, fontSize: 16 },
  errorText: { color: COLORS.danger, fontSize: 18, marginBottom: 20 },
  mapContainer: { width: '100%', height: 300, borderRadius: 15, overflow: 'hidden', borderWidth: 2, borderColor: COLORS.border, marginBottom: 20 },
  map: { width: '100%', height: '100%' },
  infoBox: { backgroundColor: COLORS.surface, padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 20 },
  infoTitle: { color: COLORS.textSecondary, fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  infoDesc: { color: COLORS.success, fontSize: 14, textAlign: 'center' },
  backButton: { padding: 15, backgroundColor: COLORS.surfaceDark, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary, width: '100%', alignItems: 'center' },
  backButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }
});