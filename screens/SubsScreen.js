import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SubsScreen({ navigation }) {
  const [subs, setSubs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadSubs();
    }, [])
  );

  const loadSubs = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@subscriptions');
      const loadedSubs = jsonValue != null ? JSON.parse(jsonValue) : [];
      setSubs(loadedSubs);
    } catch(e) {
      console.error(e);
    }
  };

  // Функція для переходу на головну
  const goHome = () => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        {subs.length === 0 ? (
          // --- ВАРІАНТ 1: СПИСОК ПОРОЖНІЙ ---
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>У вас поки немає підписок</Text>
            <Text style={styles.subText}>Додайте ігри, щоб слідкувати за цінами</Text>
            
            {/* Кнопка заклику до дії */}
            <TouchableOpacity style={styles.actionButton} onPress={goHome}>
              <Text style={styles.actionButtonText}>🔍 ЗНАЙТИ ІГРИ</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // --- ВАРІАНТ 2: Є ІГРИ ---
          <FlatList
            data={subs}
            keyExtractor={(item) => item.dealID}
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Details', { game: item })}
              >
                <View style={styles.card}>
                  <Image source={{ uri: item.thumb }} style={styles.thumb} />
                  <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.price}>${item.salePrice}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </TouchableOpacity>
            )}
            // --- КНОПКА В НИЗУ СПИСКУ ---
            ListFooterComponent={
              <TouchableOpacity style={styles.backButton} onPress={goHome}>
                <Text style={styles.backButtonText}>← НА ГОЛОВНУ</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
  
  // Стилі для порожнього стану
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyEmoji: { fontSize: 50, marginBottom: 20 },
  emptyText: { color: '#c7d5e0', fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subText: { color: '#8f98a0', fontSize: 14, marginBottom: 30, textAlign: 'center' },

  // Кнопка "Знайти ігри" (Велика синя)
  actionButton: {
    backgroundColor: '#66c0f4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Кнопка "На головну" (Прозора з рамкою)
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4b6b8b',
    alignItems: 'center',
    marginHorizontal: 20, // Відступи збоку
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  backButtonText: {
    color: '#8f98a0',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Картка гри
  card: {
    flexDirection: 'row', backgroundColor: '#16202d', marginBottom: 10,
    height: 80, alignItems: 'center', paddingRight: 15, borderRadius: 5,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  thumb: { width: 100, height: '100%', resizeMode: 'cover', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
  info: { flex: 1, paddingHorizontal: 15, justifyContent: 'center' },
  title: { color: '#c7d5e0', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  price: { color: '#66c0f4', fontSize: 18, fontWeight: 'bold' },
  arrow: { color: '#4b6b8b', fontSize: 24, fontWeight: 'bold' }
});