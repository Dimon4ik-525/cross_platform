import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors'; // Наші фірмові кольори

export default function SubsScreen() {
  const [subs, setSubs] = useState([]);
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Header />
      
      {/* ПАНЕЛЬ НАВІГАЦІЇ (Як у FirebaseScreen) */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>НАЗАД</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>МОЇ ПІДПИСКИ</Text>
        <View style={{ width: 60 }} /> 
      </View>

      <View style={styles.content}>
        {subs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>У вас поки немає підписок</Text>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.actionButtonText}>🔍 ЗНАЙТИ ІГРИ</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={subs}
            keyExtractor={(item) => item.dealID}
            contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Details', { game: item })}
                style={styles.card}
              >
                <Image source={{ uri: item.thumb }} style={styles.thumb} />
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.price}>${item.salePrice}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.border} />
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeBtnText}>← ПОВЕРНУТИСЬ ДО ПОШУКУ</Text>
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
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
  
  // Кастомна шапка всередині екрану
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
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  // Картки ігор
  card: {
    flexDirection: 'row', 
    backgroundColor: COLORS.surfaceDark, 
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surface,
    padding: 10,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  thumb: { width: 80, height: 45, borderRadius: 4, marginRight: 15 },
  info: { flex: 1 },
  title: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  price: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },

  // Порожній стан
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyEmoji: { fontSize: 60, marginBottom: 20 },
  emptyText: { color: COLORS.textSecondary, fontSize: 18, textAlign: 'center', marginBottom: 25 },
  actionButton: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5 },
  actionButtonText: { color: COLORS.surfaceDark, fontWeight: 'bold' },

  // Кнопка внизу
  homeBtn: { marginTop: 20, paddingVertical: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border },
  homeBtnText: { color: COLORS.textMuted, fontWeight: 'bold', fontSize: 13 }
});