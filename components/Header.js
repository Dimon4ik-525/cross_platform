import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
// Імпортуємо спеціальний компонент, який сам знає про "чубчик"
import { SafeAreaView } from 'react-native-safe-area-context';
// 1. Імпорти для навігації та іконок
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  // 2. Отримуємо об'єкт навігації
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style={styles.safeContainer} 
      edges={['top']} 
    >
      <View style={styles.headerContent}>
        {/* Логотип (по центру) */}
        <Text style={styles.logoText}>
          STEAM<Text style={styles.logoHighlight}>DEALS</Text>
        </Text>

        {/* 3. Кнопка дзвіночка (справа) */}
        <TouchableOpacity 
          style={styles.bellButton}
          onPress={() => navigation.navigate('Subs')} // Перехід на екран підписок
        >
          <Ionicons name="notifications" size={24} color="#66c0f4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#171a21',
    borderBottomWidth: 2,
    borderBottomColor: '#2a475e',
    width: '100%',
    
    // Тінь
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  // Контейнер для вмісту (щоб вирівняти лого і кнопку)
  headerContent: {
    width: '100%',
    alignItems: 'center', // Центруємо логотип
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    position: 'relative', // Важливо для абсолютної кнопки
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c7d5e0',
    letterSpacing: 2,
  },
  logoHighlight: {
    color: '#66c0f4',
  },
  // Стиль для кнопки дзвіночка
  bellButton: {
    position: 'absolute', // "Вириваємо" кнопку з потоку
    right: 20,            // Притискаємо до правого краю
    bottom: 15,           // Вирівнюємо по висоті тексту
  }
});