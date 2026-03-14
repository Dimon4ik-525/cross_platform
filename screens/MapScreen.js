import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Alert, Platform } from 'react-native';
// НОРМАЛЬНИЙ ІМПОРТ: тепер він не зламає веб, бо веб цей файл навіть не побачить!
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // 🔥 Додали іконки
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer'; // 🔥 Додали футер для єдиного стилю
import { COLORS } from '../theme/colors';

export default function MapScreen() {
  const navigation = useNavigation();
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
      
      {/* 🔥 ФІРМОВА ПАНЕЛЬ НАВІГАЦІЇ VORTEX */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={styles.screenTitleText}>РАДАР ГРАВЦІВ</Text>
        
        <View style={styles.spacer} /> 
      </View>

      {/* КОНТЕНТ */}
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Сканування супутників...</Text>
        </View>
      ) : location ? (
        <View style={styles.content}>
          
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

        </View>
      ) : (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Локація недоступна ❌</Text>
        </View>
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  /* 🔥 СТИЛІ НАВІГАЦІЇ VORTEX */
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceDark
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 100, ...Platform.select({ web: { cursor: 'pointer' } }) },
  spacer: { width: 100 }, 
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { flex: 1, padding: 20, alignItems: 'center' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  loadingText: { color: COLORS.textMuted, marginTop: 10, fontSize: 16 },
  errorText: { color: COLORS.danger, fontSize: 18, marginBottom: 20 },
  
  mapContainer: { 
    width: '100%', height: 350, borderRadius: 15, overflow: 'hidden', 
    borderWidth: 2, borderColor: COLORS.border, marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5 },
      android: { elevation: 5 },
    }),
  },
  map: { width: '100%', height: '100%' },
  
  infoBox: { backgroundColor: COLORS.surfaceDark, padding: 20, borderRadius: 10, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: COLORS.surface },
  infoTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  infoDesc: { color: COLORS.success, fontSize: 14, textAlign: 'center', lineHeight: 20 }
});